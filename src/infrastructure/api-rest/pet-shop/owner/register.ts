import { RegisterOwnerController } from "@/adapters/controllers/owner/register";
import { OwnerRepositoryGateway } from "@/adapters/gateways/database/owner/owner-repository";
import { OwnerPresenter } from "@/adapters/presenters/owner";
import {
  RegisterOwnerUseCase,
  RegisterOwnerUseCaseRequest,
} from "@/domain/pet-shop/application/use-cases/register-owner";
import { Owner } from "@/domain/pet-shop/enterprise/entities/owner";
import { PrismaOwnerDatabaseConnection } from "@/infrastructure/database-connection/prisma-owner";
import { JoiSchemaValidator } from "@/infrastructure/validation/joi/schema-validator";
import { registerOwnerSchema } from "@/infrastructure/validation/joi/schemas/register-owner";
import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

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
const registerOwnerController = new RegisterOwnerController(
  registerOwnerUseCase,
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
