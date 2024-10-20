import { Notification } from "../../enterprise/entities/notification";
import { NotificationPublisher } from "../publisher/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface SendNotificationUseCaseRequest {
  recipientEmail: string;
  title: string;
  content: string;
}

export class SendNotificationUseCase {
  constructor(
    private notificationsRepository: NotificationRepository,
    private notificationPublisher: NotificationPublisher
  ) {}

  async execute(input: SendNotificationUseCaseRequest): Promise<Notification> {
    const notification = Notification.create(input);

    await this.notificationsRepository.save(notification);

    await this.notificationPublisher.save(notification);

    return notification;
  }
}
