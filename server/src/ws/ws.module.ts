import { Module } from '@nestjs/common';
import { ChatGateway } from './controller/chat.gateway';
import { ChatService } from './services/chat.service';
import { ChatController } from './controller/chat.controller';

@Module({
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class WsModule {}
