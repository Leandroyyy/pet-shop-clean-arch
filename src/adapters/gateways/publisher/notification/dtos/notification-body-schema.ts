export interface NotificationBodySchema {
  id: string;
  recipientEmail: string;
  title: string;
  content: string;
  readAt?: Date;
  createdAt: Date;
}
