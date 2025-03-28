import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private socket: Socket;
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  private notifications: any[] = [];

  constructor() {
    this.socket = io(environment.wsUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('adminNotification', (notification: any) => {
      this.notifications = [notification, ...this.notifications];
      this.notificationsSubject.next(this.notifications);
    });
  }

  getNotifications(): Observable<any[]> {
    return this.notificationsSubject.asObservable();
  }

  getUnreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  markAllAsRead(): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    this.notificationsSubject.next(updatedNotifications);
  }

  deleteNotification(notification: any) {
    this.notifications = this.notifications.filter((n) => n !== notification);
    this.notificationsSubject.next(this.notifications);
  }
}
