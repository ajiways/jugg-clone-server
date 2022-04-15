import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeorm';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync), WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
