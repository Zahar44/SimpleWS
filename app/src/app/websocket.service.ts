import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

export interface UserEntity {
  name: string;
}

export interface UserMessage {
  sender: UserEntity;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(protected readonly socket: Socket) {
  }

  public emitUserMessage(msg: UserMessage) {
    console.log(msg);
    this.socket.emit('message', msg);
  }

  public emitUserConnected(user: UserEntity) {
    this.socket.emit('connected', user);
  }
}
