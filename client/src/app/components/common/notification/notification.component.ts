import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatTooltipModule, CommonModule, FormsModule,DialogModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  showNotifications: boolean = false;
  private subscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService
      .getNotifications()
      .subscribe((notifications) => {
        console.log(notifications);
        this.notifications = notifications.map((notification) => {
          notification.date = new Date(notification.date);
          return notification;
        });
      });
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
    this.notifications = this.notifications.filter((n) => n !== notification);
    this.notificationService.deleteNotification(notification);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
