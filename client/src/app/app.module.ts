import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './components/common/notification/notification.component';
import { NotificationService } from './shared/services/notification.service';
import { NotificationSocketService } from './shared/services/notification-socket.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: { transports: ['websocket', 'polling'] } };

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [NotificationService, NotificationSocketService],
  bootstrap: [],
})
export class AppModule {}
