import { NotificationBodySchema } from "@/adapters/gateways/publisher/notification/dtos/notification-body-schema";
import { NotificationHeaderSchema } from "@/adapters/gateways/publisher/notification/dtos/notification-header-schema";
import {
  PublisherParams,
  PublisherSource,
} from "@/adapters/gateways/publisher/publisher-source";
import { ConvertSchema } from "@/infrastructure/helpers/convert-schema";
import Mailjet from "node-mailjet";

export class MailJetNotificationPublisher
  implements PublisherSource<NotificationBodySchema, NotificationHeaderSchema>
{
  constructor(private mailjet: Mailjet, private sender: string) {}

  async publish(
    body: PublisherParams<NotificationBodySchema>[],
    headers: PublisherParams<NotificationHeaderSchema>[]
  ): Promise<void> {
    const bodyParams = ConvertSchema.toSchema(body);
    const headersParams = ConvertSchema.toSchema(headers);

    await this.mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: this.sender,
            Name: "PetShopPlace",
          },
          To: [
            {
              Email: bodyParams.recipientEmail,
            },
          ],
          Subject: bodyParams.title,
          TextPart: bodyParams.content,
        },
      ],
    });
  }
}
