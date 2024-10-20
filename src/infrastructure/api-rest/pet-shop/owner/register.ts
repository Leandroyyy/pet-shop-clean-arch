import { RegisterOwnerController } from "@/adapters/controllers/owner/register";
import { NotificationRepositoryGateway } from "@/adapters/gateways/databases/notification/notification-repository";
import { OwnerRepositoryGateway } from "@/adapters/gateways/databases/owner/owner-repository";
import { NotificationPublisherGateway } from "@/adapters/gateways/publishers/notification/notification-publisher";
import { OwnerPresenter } from "@/adapters/presenters/owner";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import {
  RegisterOwnerUseCase,
  RegisterOwnerUseCaseRequest,
} from "@/domain/pet-shop/application/use-cases/register-owner";
import { Owner } from "@/domain/pet-shop/enterprise/entities/owner";
import { PrismaNotificationDatabaseConnection } from "@/infrastructure/database-connection/prisma/notification";
import { PrismaOwnerDatabaseConnection } from "@/infrastructure/database-connection/prisma/owner";
import { MailJetNotificationPublisher } from "@/infrastructure/publishers/mail-jet/notification";
import { JoiSchemaValidator } from "@/infrastructure/validation/joi/schema-validator";
import { registerOwnerSchema } from "@/infrastructure/validation/joi/schemas/register-owner";
import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import Mailjet from "node-mailjet";

const registerOwner = Router();

const prismaClient = new PrismaClient();
const prismaOwnerDatabaseConnection = new PrismaOwnerDatabaseConnection(
  prismaClient
);
const ownerRepositoryGateway = new OwnerRepositoryGateway(
  prismaOwnerDatabaseConnection
);
const registerOwnerUseCase = new RegisterOwnerUseCase(ownerRepositoryGateway);
const schemaValidator = new JoiSchemaValidator<RegisterOwnerUseCaseRequest>(
  registerOwnerSchema
);

const mailJet = new Mailjet({});
const mailJetNotificationPublisher = new MailJetNotificationPublisher(
  mailJet,
  ""
);
const notificationPublisher = new NotificationPublisherGateway(
  mailJetNotificationPublisher
);
const prismaNotificationDatabaseConnection =
  new PrismaNotificationDatabaseConnection(prismaClient);
const notificationRepository = new NotificationRepositoryGateway(
  prismaNotificationDatabaseConnection
);
const sendNotificationUseCase = new SendNotificationUseCase(
  notificationRepository,
  notificationPublisher
);

const registerOwnerController = new RegisterOwnerController(
  registerOwnerUseCase,
  sendNotificationUseCase,
  schemaValidator
);

registerOwner.post("/", async (request: Request, response: Response) => {
  const { body, code } = await registerOwnerController.execute({
    body: request.body,
    headers: request.headers,
    params: request.params,
  });

  if ("message" in body && typeof body.message === "string") {
    return response.status(code).send(body);
  }

  const bodyResponse = OwnerPresenter.toJSON(body as Owner);

  return response.status(code).send(bodyResponse);
});

export { registerOwner };
