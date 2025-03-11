import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  notifications = [
    { type: 'Order', content: 'Your order #1234 has been shipped.' },
    {
      type: 'Offer',
      content: 'Special offer: Get 20% off your next purchase!',
    },
    { type: 'Activity', content: 'Your account has been updated.' },
    { type: 'Order', content: 'Your order #1234 has been shipped.' },
    {
      type: 'Offer',
      content: 'Special offer: Get 20% off your next purchase!',
    },
    { type: 'Activity', content: 'Your account has been updated.' },
  ];

 
}
