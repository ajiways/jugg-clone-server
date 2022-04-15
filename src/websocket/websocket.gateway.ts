import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GatherStartData } from './interfaces/gather.start.data.interface';
import { StrategyChangeData } from './interfaces/strategy.change.data.interface';
import {
  LoginData,
  UserCredentials,
} from './interfaces/userCredentials.interface';

import { WebsocketService } from './websocket.service';

@WebSocketGateway({ cors: true })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}

  handleDisconnect(client: Socket) {
    this.websocketService.removeFromGatherers(client);
    this.websocketService.removeFromClients(client);
  }

  handleConnection(client: Socket) {
    this.websocketService.addToClients(client);
    this.websocketService.sendResources(client);
    this.websocketService.sendLocations(client);
    this.websocketService.startStrategies(client);
  }

  @SubscribeMessage('game:gather:start')
  startGather(client: Socket, data: GatherStartData) {
    this.websocketService.startGather(client, data);
  }

  @SubscribeMessage('gathering:strategy:change')
  changeSelectedStrategy(client: Socket, data: StrategyChangeData) {
    this.websocketService.updateSelectedStrategy(data, client.id);
  }

  @SubscribeMessage('auth:register')
  register(client: Socket, data: UserCredentials) {
    this.websocketService.register(client, data);
  }

  @SubscribeMessage('auth:login')
  login(client: Socket, data: UserCredentials) {
    this.websocketService.login(client, data);
  }

  @SubscribeMessage('player:fatigue:update:start')
  updateFatigue(client: Socket, data: LoginData) {
    this.websocketService.updateFatigueStart(client, data);
  }
}
