import {
  Notification,
  NotificationProps,
} from "@/domain/notification/enterprise/entities/notification";

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: string
) {
  const notification = Notification.create(
    {
      content: "notification test",
      recipientEmail: "teste@notification.com",
      title: "title test",
      ...override,
    },
    id
  );

  return notification;
}
