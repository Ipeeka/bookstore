import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  notifications = [
    {
      type: 'Order',
      content: 'Your order #1234 has been shipped.',
      date: new Date(),
    },
    {
      type: 'Offer',
      content: 'Special offer: Get 20% off your next purchase!',
      date: new Date(),
    },
    {
      type: 'Activity',
      content: 'Your account has been updated.',
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      type: 'Order',
      content: 'Your order #5678 has been shipped.',
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      type: 'Offer',
      content: 'Limited-time deal: Free shipping!',
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
    },
    {
      type: 'Activity',
      content: 'Password changed successfully.',
      date: new Date(new Date().setDate(new Date().getDate() - 7)),
    },
  ];

  today: any[] = [];
  yesterday: any[] = [];
  older: any[] = [];

  constructor() {
    this.categorizeNotifications();
  }

  categorizeNotifications() {
    const todayDate = new Date().setHours(0, 0, 0, 0);
    const yesterdayDate = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).setHours(0, 0, 0, 0);

    this.today = this.notifications.filter(
      (n) => new Date(n.date).setHours(0, 0, 0, 0) === todayDate
    );
    this.yesterday = this.notifications.filter(
      (n) => new Date(n.date).setHours(0, 0, 0, 0) === yesterdayDate
    );
    this.older = this.notifications.filter(
      (n) => new Date(n.date).setHours(0, 0, 0, 0) < yesterdayDate
    );
  }

  deleteNotification(notification: any, category: string) {
    this.notifications = this.notifications.filter((n) => n !== notification);
    this.categorizeNotifications();
  }
}
