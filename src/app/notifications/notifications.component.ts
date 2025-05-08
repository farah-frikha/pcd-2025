import { Component, OnInit } from '@angular/core';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  priority: string;
  time: Date;
  read: boolean;
  actionUrl?: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  
  ngOnInit() {
    // Initialize with mock data
    this.notifications = [
      {
        id: 1,
        title: 'Nouveau rendez-vous',
        message: 'Vous avez un nouveau rendez-vous',
        type: 'appointment',
        priority: 'high',
        time: new Date(),
        read: false
      }
    ];
  }

  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }

  filterNotifications(event: any) {
    // TODO: Implement filtering
  }

  readNotification(notification: any) {
    notification.read = true;
  }

  deleteNotification(notification: any) {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }

  getNotificationIcon(type: string): string {
    return 'fas fa-bell'; // Default icon
  }

  getNotificationColor(priority: string): string {
    return '#4F46E5'; // Default color
  }
}
