import { OwnerRepository } from "../../../../core/pet-shop/application/repositories/owner-repository";
import { Owner } from "../../../../core/pet-shop/enterprise/entities/owner";
import { DatabaseSource, DbParams } from "../database-source";
import { OwnerDbSchema } from "./dtos/owner-db-schema";

export class OwnerRepositoryGateway implements OwnerRepository {
  constructor(private databaseSource: DatabaseSource<OwnerDbSchema>) {}

  async findyById(id: string): Promise<Owner | null> {
    const data = await this.databaseSource.searchByParameters(
      [{field: "id", value: id}]
    );

    if (!data || !data.length) {
      return null;
    }

    const [row] = data;
    return Owner.create(
      {
        birthday: new Date(row.birthday),
        document: row.document,
        email: row.email,
        name: row.name,
      },
      row.id
    );
  }

  async edit(owner: Owner): Promise<void> {
    const parameters: DbParams<OwnerDbSchema>[] = [];
    parameters.push({ field: "id", value: owner.id });
    parameters.push({ field: "name", value: owner.name });
    parameters.push({ field: "email", value: owner.email });
    parameters.push({ field: "birthday", value: owner.birthday });
    parameters.push({ field: "document", value: owner.document });

    await this.databaseSource.update(parameters);
  }

  async findByDocument(document: string): Promise<Owner | null> {
    const data = await this.databaseSource.searchByParameters(
      [{ field: "document", value: document }]
    );

    if (!data || !data.length) {
      return null;
    }

    const [row] = data;
    return Owner.create(
      {
        birthday: new Date(row.birthday),
        document: row.document,
        email: row.email,
        name: row.name,
      },
      row.id
    );
  }

  async save(owner: Owner): Promise<void> {
    const parameters: DbParams<OwnerDbSchema>[] = [];
    parameters.push({ field: "id", value: owner.id });
    parameters.push({ field: "name", value: owner.name });
    parameters.push({ field: "email", value: owner.email });
    parameters.push({ field: "birthday", value: owner.birthday.toString() });
    parameters.push({ field: "document", value: owner.document });

    await this.databaseSource.insert(parameters);
  }
}
