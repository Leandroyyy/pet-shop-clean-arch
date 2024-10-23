import {
  DatabaseSource,
  DbParams,
} from "@/adapters/gateways/databases/database-source";
import { PetDbSchema } from "@/adapters/gateways/databases/pet/dtos/pet-db-schema";
import { ConvertSchema } from "@/infrastructure/helpers/convert-schema";
import { PrismaClient } from "@prisma/client";

export class PrismaPetDatabaseConnection
  implements DatabaseSource<PetDbSchema>
{
  constructor(private prisma: PrismaClient) {}

  searchByParameters(
    parameters: DbParams<PetDbSchema>[]
  ): Promise<PetDbSchema[]> {
    throw new Error("Method not implemented.");
  }
  update(parameters: DbParams<PetDbSchema>[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async insert(parameters: DbParams<PetDbSchema>[]): Promise<void> {
    const params = ConvertSchema.toSchema(parameters);

    await this.prisma.pet.create({
      data: {
        birthday: params.birthday,
        breed: params.breed,
        gender: params.gender,
        id: params.id,
        name: params.name,
        type: params.type,
      },
    });
  }
}
