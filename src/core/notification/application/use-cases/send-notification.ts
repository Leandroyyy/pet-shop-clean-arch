import { Notification } from "../../enterprise/entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(input: SendNotificationUseCaseRequest): Promise<Notification> {
    const notification = Notification.create(input);

    await this.notificationsRepository.save(notification);

    return notification;
  }
}
