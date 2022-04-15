import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GathererInfo } from './interfaces/gathererInfo.iterface';
import {
  LoginData,
  UserCredentials,
} from './interfaces/userCredentials.interface';
import { hash, compare } from 'bcrypt';
import { Location } from './entities/location.entity';
import { Resource as ResourceEntity } from './entities/resource.entity';
import { GathererTimer } from './interfaces/gathrer.timer.interface';
import { RatingItem } from './interfaces/rating.item.interface';

@Injectable()
export class WebsocketService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
  ) {
    this.runStrategyIdChange();
  }

  private clients: Socket[] = [];
  private gatherers: GathererInfo[] = [];
  private gathererTimers: GathererTimer[] = [];

  private currentStrategyId = 0;

  addToClients(client: Socket) {
    this.clients.push(client);
  }

  removeFromClients(client: Socket) {
    this.clients = this.clients.filter((cl) => cl.id !== client.id);
  }

  async sendRatingList(client: Socket) {
    const ratingList = await this.userRepository.find({
      take: 100,
      order: { mastery: 'DESC' },
    });

    const ratingListArr: RatingItem[] = [];

    ratingList.forEach(({ login, mastery }) =>
      ratingListArr.push({ login, currentMastery: mastery }),
    );

    client.emit('rating:get:list:response', ratingListArr);
  }

  async updateFatigueStart(client: Socket, data: LoginData) {
    const user = await this.userRepository.findOne({
      where: { login: data.login },
    });

    if (!user) {
      return;
    }

    if (this.gathererTimers.find((gt) => gt.login === data.login)) return;

    const interval = setInterval(async () => {
      const user = await this.userRepository.findOne({
        where: { login: data.login },
      });

      const newFatigueLevel = user.fatigue + 1;

      if (newFatigueLevel > 100) {
        const gatherer = this.gathererTimers.find(
          (gt) => gt.login === data.login,
        );

        if (!gatherer) return;

        clearInterval(gatherer.timer);

        const index = this.gathererTimers.indexOf(gatherer);

        if (index > -1) {
          this.gathererTimers.splice(index, 1);
        }

        return;
      }

      const gatherer = this.gatherers.find((g) => g.login === data.login);

      user.fatigue++;
      await this.userRepository.save(user);

      if (!gatherer) return;

      const clientT = this.clients.find((cl) => cl.id === gatherer.clientId);

      if (!clientT)
        throw new Error('Не могу найти клиента чтобы обновить фатиг');

      clientT.emit('fatigue:update', newFatigueLevel);
    }, 10000);

    this.gathererTimers.push({ login: data.login, timer: interval });
  }

  async sendLocations(client: Socket) {
    const locations = await this.locationRepository.find();

    client.emit('location:get:list', locations);
  }
  async sendResources(client: Socket) {
    const resources = await this.resourceRepository.find();

    client.emit('resource:get:list', resources);
  }

  async register(client: Socket, data: UserCredentials) {
    const candidate = await this.userRepository.findOne({
      where: { login: data.login },
    });

    if (candidate) {
      client.emit('auth:register:response', {
        error: true,
        message: 'Такой логин занят',
      });
      return;
    }

    const hasedPassword = await hash(data.password, 7);

    const user = await this.userRepository.save({
      login: data.login,
      password: hasedPassword,
    });

    client.emit('auth:register:response', {
      error: false,
      message: 'Успешно, user',
      user,
    });
  }

  async login(client: Socket, data: UserCredentials) {
    const candidate = await this.userRepository.findOne({
      where: { login: data.login },
    });

    if (!candidate) {
      client.emit('auth:login:response', {
        error: true,
        message: 'Такого юзера нет',
      });
      return;
    }

    this.addGatherer(client, data.login);

    const isMatch = await compare(data.password, candidate.password);

    if (!isMatch) {
      client.emit('auth:login:response', {
        error: true,
        message: 'Неправильный пароль',
      });
      return;
    }

    client.emit('auth:login:response', {
      error: false,
      message: 'Успешный вход',
      user: candidate,
    });
  }

  async startGather(
    client: Socket,
    data: { resource: ResourceEntity; login: string },
  ) {
    const user = await this.userRepository.findOne({
      where: { login: data.login },
    });

    if (!user) return;

    console.log(user.mastery, data.resource.masteryMin);

    if (user.mastery < data.resource.masteryMin) {
      client.emit('gather:start:error', {
        message: 'Недостаточно мастерства.',
      });
      user.fatigue -= data.resource.fatigueReq;
      await this.userRepository.save(user);
      return;
    }

    let counter = 0;
    const chance = data.resource.chanceToGather;
    let chanceToMasterUp = 1;

    const diff = user.masteryCap - user.mastery;

    if (diff === 0) {
      user.masteryCap = user.masteryCap + 60;
      await this.userRepository.save(user);
      client.emit('user:update:user', { user });
    } else if (diff < 5) {
      chanceToMasterUp = chanceToMasterUp / 12;
    } else if (diff < 10) {
      chanceToMasterUp = chanceToMasterUp / 8.2;
    } else if (diff < 15) {
      chanceToMasterUp = chanceToMasterUp / 7.0;
    } else if (diff < 20) {
      chanceToMasterUp = chanceToMasterUp / 6.8;
    } else if (diff < 30) {
      chanceToMasterUp = chanceToMasterUp / 5.5;
    } else if (diff < 40) {
      chanceToMasterUp = chanceToMasterUp / 4.15;
    }

    if (user.mastery >= data.resource.masteryMax) {
      chanceToMasterUp = 0;
    }

    if (user.fatigue < data.resource.fatigueReq) return;

    user.fatigue -= data.resource.fatigueReq;
    await this.userRepository.save(user);

    const gatherTimer = setInterval(() => {
      client.emit('progress.tick', ++counter);

      if (counter == 100) {
        clearInterval(gatherTimer);

        const { selectedStrategyId } = this.gatherers.find(
          (g) => g.clientId === client.id,
        );

        this.resolveGatherTry(
          selectedStrategyId,
          this.currentStrategyId,
          chance,
          chanceToMasterUp,
          client,
          user,
        );
      }
    }, data.resource.timeToGather);
  }

  startStrategies(client: Socket) {
    setInterval(() => {
      client.emit('strategy:change', this.currentStrategyId);
    }, 10000);
  }

  updateSelectedStrategy(
    data: { id: number; login: string },
    clientId: string,
  ) {
    const candidate = this.gatherers.find((g) => g.clientId === clientId);

    candidate.selectedStrategyId = data.id;
  }

  addGatherer(client: Socket, login: string) {
    this.gatherers.push({
      selectedStrategyId: 0,
      clientId: client.id,
      login,
    });
  }

  removeFromGatherers(client: Socket) {
    this.gatherers = this.gatherers.filter((g) => g.clientId !== client.id);
  }

  private async resolveGatherTry(
    selectedStrategy: number,
    currentStrategy: number,
    chance: number,
    chanceToMasterUp: number,
    client: Socket,
    user: User,
  ) {
    if (selectedStrategy === currentStrategy) {
      if (Math.random() < chance) {
        if (Math.random() < chanceToMasterUp) {
          user.mastery++;
          await this.userRepository.save(user);
          client.emit('gathering:complete', {
            masteryUp: true,
            gathered: true,
          });
          return;
        } else {
          client.emit('gathering:complete', {
            masteryUp: false,
            gathered: true,
          });
          return;
        }
      } else {
        client.emit('gathering:complete', {
          masteryUp: false,
          gathered: false,
        });
        return;
      }
    } else {
      if (Math.random() < chance / 2) {
        if (Math.random() < chanceToMasterUp) {
          user.mastery++;
          await this.userRepository.save(user);
          client.emit('gathering:complete', {
            masteryUp: true,
            gathered: true,
          });
          return;
        } else {
          client.emit('gathering:complete', {
            masteryUp: false,
            gathered: true,
          });
          return;
        }
      } else {
        client.emit('gathering:complete', {
          masteryUp: false,
          gathered: false,
        });
      }
    }
  }

  private runStrategyIdChange() {
    setInterval(() => {
      this.currentStrategyId = Math.floor(
        Math.min(Math.max(Math.random() * 4, 1), 3),
      );
    }, 5000);
  }
}
