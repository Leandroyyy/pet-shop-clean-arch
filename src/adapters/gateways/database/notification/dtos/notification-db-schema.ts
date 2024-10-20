export interface NotificationDbSchema {
  id: string;
  title: string;
  content: string;
  readAt?: Date;
  createdAt: string;
  recipientEmail: string;
}
