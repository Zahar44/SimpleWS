import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { AutorizationComponent } from './autorization/autorization.component';

const config: SocketIoConfig = { url: 'http://localhost:3000'};

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    AutorizationComponent
  ],
  imports: [
    BrowserModule,  
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
