import { Router } from "express";
import { CreateClientController } from "../../../adapters/controllers/create-client";
import { SqliteClientRepository } from "../../../adapters/gateways/database/sqlite/client/sqlite-client-repository";
import { CreateClientUseCase } from "../../../domain/application/use-cases/create-client";
import { SqliteConnection } from "../../../infra/database-connection/postgres-connection";

const createClientRoute = Router();

const sqliteDbConnection = new SqliteConnection("dsn");
const clientRepository = new SqliteClientRepository(sqliteDbConnection);
const createClientUseCase = new CreateClientUseCase(clientRepository);
const createClientController = new CreateClientController(
  createClientUseCase,
  sqliteDbConnection
);

createClientRoute.post("/client", (request, response) => {
  return createClientController.execute(request, response);
});


export { createClientRoute };
