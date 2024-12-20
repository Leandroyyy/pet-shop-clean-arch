import { Notification } from "../../enterprise/entities/notification";

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
}
