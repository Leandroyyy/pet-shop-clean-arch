import { NotificationBodySchema } from "@/adapters/gateways/publishers/notification/dtos/notification-body-schema";
import { NotificationHeaderSchema } from "@/adapters/gateways/publishers/notification/dtos/notification-header-schema";
import {
  PublisherParams,
  PublisherSource,
} from "@/adapters/gateways/publishers/publisher-source";
import { ConvertSchema } from "@/infrastructure/helpers/convert-schema";
import nodemailer, { Transporter } from "nodemailer";

export class NodeMailerPublisher
  implements PublisherSource<NotificationBodySchema, NotificationHeaderSchema>
{
  private transporter: Transporter;

  constructor(private user: string, private pass: string) {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 405,
      service: "gmail",
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  async publish(
    body: PublisherParams<NotificationBodySchema>[],
    headers: PublisherParams<NotificationHeaderSchema>[]
  ): Promise<void> {
    const bodyParams = ConvertSchema.toSchema(body);
    const headersParams = ConvertSchema.toSchema(headers);

    this.transporter.sendMail({
      from: `<${this.user}>`,
      to: bodyParams.recipientEmail,
      subject: bodyParams.title,
      text: bodyParams.content,
    });
  }
}
