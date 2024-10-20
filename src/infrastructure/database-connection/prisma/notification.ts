import {
  DatabaseSource,
  DbParams,
} from "@/adapters/gateways/databases/database-source";
import { NotificationDbSchema } from "@/adapters/gateways/databases/notification/dtos/notification-db-schema";
import { ConvertSchema } from "@/infrastructure/helpers/convert-schema";
import { PrismaClient } from "@prisma/client";

export class PrismaNotificationDatabaseConnection
  implements DatabaseSource<NotificationDbSchema>
{
  constructor(private prisma: PrismaClient) {}

  searchByParameters(
    parameters: DbParams<NotificationDbSchema>[]
  ): Promise<NotificationDbSchema[]> {
    throw new Error("Method not implemented.");
  }
  update(parameters: DbParams<NotificationDbSchema>[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async insert(parameters: DbParams<NotificationDbSchema>[]): Promise<void> {
    const params = ConvertSchema.toSchema(parameters);

    await this.prisma.notification.create({
      data: {
        id: params.id,
        title: params.title,
        content: params.content,
        createdAt: params.createdAt,
        readAt: params.readAt,
        recipientEmail: params.recipientEmail,
      },
    });
  }
}
