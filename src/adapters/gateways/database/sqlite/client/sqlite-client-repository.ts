import { ClientRepository } from "../../../../../core/pet-shop/application/repositories/owner-repository";
import { Client } from "../../../../../core/pet-shop/enterprise/entities/owner";
import { DbConnection, DbParams } from "../db-connection";

export class SqliteClientRepository implements ClientRepository {
  private tableName = "clients";

  constructor(private connection: DbConnection) {}

  public async findByDocument(document: string): Promise<Client | null> {
    const data = await this.connection.searchByParameters(
      this.tableName,
      null,
      [{ field: "document", value: document }]
    );

    if (data === null || data === undefined) return null;
    if (data.length < 1) return null;

    const row = data[0];
    return new Client({
      id: row.id,
      birthday: new Date(row.birthday),
      document: row.document,
      email: row.email,
      name: row.name,
    });
  }

  async save(client: Client): Promise<void> {
    const parameters: DbParams[] = [];
    parameters.push({ field: "id", value: client.id });
    parameters.push({ field: "name", value: client.name });
    parameters.push({ field: "email", value: client.email });
    parameters.push({ field: "birthday", value: client.birthday });
    parameters.push({ field: "document", value: client.document });

    await this.connection.insert(this.tableName, parameters);
  }
}
