import { NotificationPublisher } from "@/domain/notification/application/publishers/notification";
import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { PublisherParams, PublisherSource } from "../publisher-source";
import { NotificationBodySchema } from "./dtos/notification-body-schema";
import { NotificationHeaderSchema } from "./dtos/notification-header-schema";

export class NotificationPublisherGateway implements NotificationPublisher {
  constructor(
    private publisherSource: PublisherSource<
      NotificationBodySchema,
      NotificationHeaderSchema
    >
  ) {}

  async save(notification: Notification): Promise<void> {
    const bodies: PublisherParams<NotificationBodySchema>[] = [];
    bodies.push({ field: "id", value: notification.id });
    bodies.push({ field: "title", value: notification.title });
    bodies.push({ field: "content", value: notification.content });
    bodies.push({
      field: "recipientEmail",
      value: notification.recipientEmail,
    });
    bodies.push({ field: "createdAt", value: notification.createdAt });
    bodies.push({ field: "readAt", value: notification.readAt });

    const headers: PublisherParams<NotificationHeaderSchema>[] = [];
    headers.push({ field: "operationType", value: "create" });

    await this.publisherSource.publish(bodies, headers);
  }
}
