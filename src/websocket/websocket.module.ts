import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Location } from './entities/location.entity';
import { Resource } from './entities/resource.entity';
import { MessageEntity } from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Location, Resource, MessageEntity]),
  ],
  providers: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
