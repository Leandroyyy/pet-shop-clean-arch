import { OwnerRepository } from "../../../../../core/pet-shop/application/repositories/owner-repository";
import { Owner } from "../../../../../core/pet-shop/enterprise/entities/owner";
import { DbParams, SqlDbConnection } from "../db-connection";
import { OwnerDbSchema } from "./dtos/owner-db-schema";

export class SqlOwnerRepository implements OwnerRepository {
  private tableName = "clients";

  constructor(private connection: SqlDbConnection) {}

  async findyById(id: string): Promise<Owner | null> {
    const data = await this.connection.searchByParameters<OwnerDbSchema>(
      this.tableName,
      null,
      [{ field: "id", value: id }]
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
    parameters.push({ field: "birthday", value: owner.birthday.toString() });
    parameters.push({ field: "document", value: owner.document });

    await this.connection.update(this.tableName, parameters);
  }

  async findByDocument(document: string): Promise<Owner | null> {
    const data = await this.connection.searchByParameters<OwnerDbSchema>(
      this.tableName,
      null,
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

    await this.connection.insert(this.tableName, parameters);
  }
}
