import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment.development';  // Ensure correct import

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private socket: Socket;
  private notificationsSubject = new BehaviorSubject<any[]>([]);  // Store all notifications
  private notifications: any[] = [];  // Store notifications in memory

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
    // Listen for new notifications
    this.socket.on('adminNotification', (notification: any) => {
      this.notifications = [notification, ...this.notifications];  // Add the new notification to the beginning
      this.notificationsSubject.next(this.notifications);  // Emit the updated list of notifications
    });
  }

  // Get notifications observable
  getNotifications(): Observable<any[]> {
    return this.notificationsSubject.asObservable();
  }

  // Get unread notifications count
  getUnreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  // Mark all notifications as read
  markAllAsRead(): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.map(notification => ({
      ...notification,
      read: true,
    }));
    this.notificationsSubject.next(updatedNotifications);
  }

  // Delete notification
  deleteNotification(notification: any) {
    this.notifications = this.notifications.filter((n) => n !== notification);
    this.notificationsSubject.next(this.notifications);
  }
}
