import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  constructor(private socket: Socket) {}

  listenForNotifications() {
    return this.socket.fromEvent('adminNotification');
  }
}
