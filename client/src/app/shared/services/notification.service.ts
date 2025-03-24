import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment.development';  // Ensure correct import

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private socket: Socket;
  private notificationsSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.socket = io(environment.wsUrl, {  // Ensure you're using correct WebSocket URL from environment
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    // Listening for the adminNotification event
    this.socket.on('adminNotification', (notification: any) => {
      const currentNotifications = this.notificationsSubject.value;
      this.notificationsSubject.next([notification, ...currentNotifications]);
    });

    this.socket.on('connect_error', (error: any) => {
      console.error('WebSocket connection error:', error);
    });
  }

  getNotifications(): Observable<any[]> {
    return this.notificationsSubject.asObservable();
  }

  clearNotifications() {
    this.notificationsSubject.next([]);
  }

  markAllAsRead(): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.map(notification => ({
      ...notification,
      read: true,
    }));
    this.notificationsSubject.next(updatedNotifications);
  }
}
