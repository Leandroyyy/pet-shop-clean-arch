import { Request, Response } from "express";
import { CreateClientUseCase } from "../../domain/application/use-cases/create-client";
import { ConflictError } from "../../domain/enterprise/errors/conflict";
import { DbConnection } from "../gateways/database/sqlite/db-connection";

export class CreateClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private dbConnection: DbConnection
  ) {}

  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;

      await this.dbConnection.beginTransaction();

      const client = await this.createClientUseCase.execute(body);

      await this.dbConnection.commit();

      return response.status(200).json(client);
    } catch (error) {
      await this.dbConnection.rollback();

      if (error instanceof ConflictError) {
        return response.status(409).json({
          message: error.message,
        });
      }

      return response.status(500).json({
        message: "Unexpected error",
      });
    }
  }
}
