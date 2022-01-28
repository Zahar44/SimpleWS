import { Injectable } from '@nestjs/common';

export interface UserEntity {
  name: string;
}

export interface UserMessage {
  sender: UserEntity;
  msg: string;
}

@Injectable()
export class ChatService {
  private readonly chatHistory: UserMessage[] = [];

  public getChatHisoty(): UserMessage[] {
    return this.chatHistory;
  }

  public addUser(user: UserEntity) {
    //
  }

  public addUserMessage(userMessage: UserMessage) {
    this.chatHistory.push(userMessage);
  }
}
