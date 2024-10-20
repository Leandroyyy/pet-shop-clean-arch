import { mock } from "jest-mock-extended";
import { NotificationPublisher } from "../publisher/notification";
import { NotificationRepository } from "../repositories/notification-repository";
import { SendNotificationUseCase } from "./send-notification";

describe("Send Notification", () => {
  let notificationsRepository: NotificationRepository;
  let notificationPublisher: NotificationPublisher;
  let sendNotificationUseCase: SendNotificationUseCase;

  beforeAll(() => {
    notificationPublisher = mock();
    notificationsRepository = mock();
    sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
      notificationPublisher
    );
  });

  it("should be able to send notification", async () => {
    const notification = await sendNotificationUseCase.execute({
      content: "sending message",
      recipientEmail: "123",
      title: "message to notify",
    });

    expect(notification).toEqual({
      _id: expect.any(String),
      props: {
        content: "sending message",
        createdAt: expect.any(Date),
        recipientEmail: "123",
        title: "message to notify",
      },
    });

    expect(notificationsRepository.save).toHaveBeenCalledTimes(1);
    expect(notificationPublisher.save).toHaveBeenCalledTimes(1);
  });
});
