import { NotAllowedError } from "../../../commons/errors/not-allowed";
import { NotFoundError } from "../../../commons/errors/not-found";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface ReadNotificationUseCaseRequest {
  recipientId: string;
  notificationId: string;
}

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<Notification> {
    const notification = await this.notificationsRepository.findById(
      notificationId
    );

    if (!notification) {
      throw new NotFoundError("Notification id doesn't exists");
    }

    if (recipientId !== notification.recipientId) {
      throw new NotAllowedError("Notification not allowed to be read");
    }

    notification.read();

    await this.notificationsRepository.edit(notification);

    return notification;
  }
}
