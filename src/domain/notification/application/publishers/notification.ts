import { Notification } from "../../enterprise/entities/notification";

export interface NotificationPublisher {
  save(notification: Notification): Promise<void>;
}
