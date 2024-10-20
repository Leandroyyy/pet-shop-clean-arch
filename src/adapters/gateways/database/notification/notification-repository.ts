import { NotificationRepository } from "@/domain/notification/application/repositories/notification-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { DatabaseSource, DbParams } from "../database-source";
import { NotificationDbSchema } from "./dtos/notification-db-schema";

export class NotificationRepositoryGateway implements NotificationRepository {
  constructor(private databaseSource: DatabaseSource<NotificationDbSchema>) {}

  async save(notification: Notification): Promise<void> {
    const parameters: DbParams<NotificationDbSchema>[] = [];

    parameters.push({ field: "id", value: notification.id });
    parameters.push({ field: "title", value: notification.title });
    parameters.push({ field: "content", value: notification.content });
    parameters.push({ field: "readAt", value: notification.readAt });
    parameters.push({ field: "createdAt", value: notification.createdAt });
    parameters.push({
      field: "recipientEmail",
      value: notification.recipientEmail,
    });

    await this.databaseSource.insert(parameters);
  }
}
