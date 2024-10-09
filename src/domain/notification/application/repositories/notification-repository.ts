import { Notification } from "../../enterprise/entities/notification";

export interface NotificationRepository {
  findById(id: string): Promise<Notification | null>;
  save(notification: Notification): Promise<void>;
  edit(notification: Notification): Promise<void>;
}
