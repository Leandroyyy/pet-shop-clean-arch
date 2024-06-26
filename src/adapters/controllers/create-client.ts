import { ServerResponse } from "http";
import { CreateClientUseCase } from "../../core/pet-shop/application/use-cases/register-owner";
import { SqlDbConnection } from "../gateways/database/sql/db-connection";

export class CreateClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private dbConnection: SqlDbConnection
  ) {}

  async execute(
    request: Request,
    response: ServerResponse
  ): Promise<ServerResponse> {
    try {
      await this.dbConnection.beginTransaction();

      const client = await this.createClientUseCase.execute(body);

      await this.dbConnection.commit();

      return response.status(200).json(client);
    } catch (error) {
      await this.dbConnection.rollback();
    }
  }
}
