import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatTooltipModule,CommonModule,FormsModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  showNotifications: boolean = false;
  private subscription!: Subscription;
  

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Subscribe to notifications
    this.subscription = this.notificationService.getNotifications().subscribe(
      (notifications) => {
        console.log(notifications);  // Debugging: Ensure the notifications are being emitted
        this.notifications = notifications.map(notification => {
          notification.date = new Date(notification.date);  // Format date properly
          return notification;
        });
      }
    );
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
    this.showNotifications = false;  // Hide the notifications after marking them as read
  }

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  deleteNotification(notification: any) {
    // Handle notification deletion (remove from UI or notify the backend if necessary)
    this.notifications = this.notifications.filter((n) => n !== notification);
    this.notificationService.deleteNotification(notification);  // Optional: Call backend to delete the notification
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
