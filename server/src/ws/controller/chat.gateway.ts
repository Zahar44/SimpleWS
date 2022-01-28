import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagePipe } from '../../pipes/message.pipe';
import { ChatService, UserEntity, UserMessage } from '../services/chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {
    //
  }

  @SubscribeMessage('message')
  public main(
    @MessageBody(MessagePipe) msg: UserMessage,
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.debug(JSON.stringify(msg));
    this.chatService.addUserMessage(msg);

    const chatHistory = this.chatService.getChatHisoty();
    this.server.emit('message', chatHistory);
  }

  @SubscribeMessage('connected')
  public handleConnected(@MessageBody() user: UserEntity) {
    this.logger.debug(`${user.name} connected!`);
    this.chatService.addUser(user);
  }
}
