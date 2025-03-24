import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  notifications: any[] = [];
  showNotifications: boolean = false;
  private subscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.getNotifications().subscribe(
      (notifications) => {
        console.log(notifications);  // Check if date is correct
        this.notifications = notifications.map(notification => {
          notification.date = new Date(notification.date); // Ensure it's a Date object
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
    this.showNotifications = false;
  }

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  deleteNotification(notification: any) {
    // Handle notification deletion (remove from UI or notify the backend if necessary)
    this.notifications = this.notifications.filter(
      (n) => n !== notification
    );
    // You can also implement a service call to delete it from the backend if necessary
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
