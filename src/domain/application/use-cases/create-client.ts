import { Client } from "../../enterprise/entities/client";
import { ConflictError } from "../../enterprise/errors/conflict";
import { ClientRepository } from "../repositories/client-repository";

interface CreateClientUseCaseRequest {
  name: string;
  document: string;
  birthday: string;
  email: string;
}

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(input: CreateClientUseCaseRequest): Promise<Client> {
    
    const emailAlreadyExists = await this.clientRepository.findByDocument(input.document);

    if(emailAlreadyExists) {
      throw new ConflictError('Email already exists')
    }

    const client = new Client({ ...input, birthday: new Date(input.birthday) });
    
    await this.clientRepository.save(client);

    return client;
  }
}
