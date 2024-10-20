import {
  DatabaseSource,
  DbParams,
} from "@/adapters/gateways/database/database-source";
import { OwnerDbSchema } from "@/adapters/gateways/database/owner/dtos/owner-db-schema";
import { ConvertSchema } from "@/infrastructure/helpers/convert-schema";
import { PrismaClient } from "@prisma/client";

export class PrismaOwnerDatabaseConnection
  implements DatabaseSource<OwnerDbSchema>
{
  constructor(private prisma: PrismaClient) {}

  async searchByParameters(
    parameters: DbParams<OwnerDbSchema>[]
  ): Promise<OwnerDbSchema[]> {
    const params = ConvertSchema.toSchema(parameters);

    const owner = await this.prisma.owner.findMany({
      where: {
        ...params,
      },
    });

    return owner;
  }

  async insert(parameters: DbParams<OwnerDbSchema>[]): Promise<void> {
    const params = ConvertSchema.toSchema(parameters);

    await this.prisma.owner.create({
      data: {
        birthday: params.birthday,
        document: params.document,
        email: params.email,
        id: params.id,
        name: params.name,
      },
    });
  }

  async update(parameters: DbParams<OwnerDbSchema>[]): Promise<void> {
    const params = ConvertSchema.toSchema(parameters);

    const petsIds = params.petIds?.map((id: string) => ({ id })) || [];

    await this.prisma.owner.update({
      where: {
        id: params.id,
      },
      data: {
        birthday: params.birthday,
        document: params.document,
        email: params.email,
        id: params.id,
        name: params.name,
        pets: {
          set: petsIds,
        },
      },
    });
  }
}
