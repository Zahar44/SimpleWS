import { Controller, Get } from '@nestjs/common';
import { ChatService } from '../services/chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {
    //
  }

  @Get() getAll() {
    const chatHistory = this.chatService.getChatHisoty();
    return chatHistory;
  }
}
