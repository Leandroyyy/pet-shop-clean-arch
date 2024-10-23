import { RegisterPetController } from "@/adapters/controllers/pet/register";
import { OwnerRepositoryGateway } from "@/adapters/gateways/databases/owner/owner-repository";
import { PetRepositoryGateway } from "@/adapters/gateways/databases/pet/pet-repository";
import { PetPresenter } from "@/adapters/presenters/pet";
import {
  RegisterPetUseCase,
  RegisterPetUseCaseRequest,
} from "@/domain/pet-shop/application/use-cases/register-pet";
import { Pet } from "@/domain/pet-shop/enterprise/entities/pet";
import { PrismaOwnerDatabaseConnection } from "@/infrastructure/database-connection/prisma/owner";
import { PrismaPetDatabaseConnection } from "@/infrastructure/database-connection/prisma/pet";
import { JoiSchemaValidator } from "@/infrastructure/validation/joi/schema-validator";
import { registerPetSchema } from "@/infrastructure/validation/joi/schemas/register-pet";
import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const registerPet = Router();

const prismaClient = new PrismaClient();
const prismaPetDatabaseConnection = new PrismaPetDatabaseConnection(
  prismaClient
);
const petRepositoryGateway = new PetRepositoryGateway(
  prismaPetDatabaseConnection
);
const prismaOwnerDatabaseConnection = new PrismaOwnerDatabaseConnection(
  prismaClient
);
const ownerRepositoryGateway = new OwnerRepositoryGateway(
  prismaOwnerDatabaseConnection
);

const registerPetUseCase = new RegisterPetUseCase(
  petRepositoryGateway,
  ownerRepositoryGateway
);
const schemaValidator = new JoiSchemaValidator<RegisterPetUseCaseRequest>(
  registerPetSchema
);

const registerPetController = new RegisterPetController(
  registerPetUseCase,
  schemaValidator
);

registerPet.post("/", async (request: Request, response: Response) => {
  const { body, code } = await registerPetController.execute({
    body: request.body,
    headers: request.headers,
    params: request.params,
  });

  if (body instanceof Pet) {
    const presenter = PetPresenter.toJSON(body);
    return response.status(code).send(presenter);
  }

  return response.status(code).send(body);
});

export { registerPet };
