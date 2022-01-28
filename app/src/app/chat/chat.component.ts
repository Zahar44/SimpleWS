import { Component, Input, OnInit } from '@angular/core';
import { UserEntity, UserMessage, WebsocketService } from '../websocket.service';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AutorizationService } from '../autorization/autorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent extends WebsocketService implements OnInit {

  constructor(
    protected override readonly socket: Socket, 
    private readonly autorizationService: AutorizationService,
    private readonly httpClient: HttpClient,
    private readonly route: Router,
  ) {
    super(socket);
    this.socket.on('message', (...args: any[]) => {
      const _chatHistory: UserMessage[] = args[0];
      this.chatHistory = _chatHistory; 
    });
   }

  @Input() message: string = '';
  @Input() sender!: UserEntity;
  chatHistory: UserMessage[] = []; 

  @Input() async onSend() {
    if (this.msgNotEmpty()) {
      this.emitUserMessage(this.buildMsg());
      this.message = '';
    }
  }

  onKeydown(event: Event) {
    this.onSend();
  }

  async ngOnInit(): Promise<void> {
    if (!this.autorizationService.isAuthenticated()) {
      this.route.navigate(['autorization']);
      return;
    }

    const user = this.autorizationService.getUser();
    this.sender = user;
    this.emitUserConnected(this.sender);
    const response = 
        await this.httpClient.get<UserMessage[]>(environment.serverApi).toPromise() || [];
    this.chatHistory = response;
  }

  private buildMsg(): UserMessage {
    return {
      sender: this.autorizationService.getUser(),
      msg: this.message,
    }
  }

  private msgNotEmpty() {
    return this.message !== '';
  }
}
