import { Client } from "../../enterprise/entities/client";
import { Pet } from "../../enterprise/entities/pet";
import { ConflictError } from "../../enterprise/errors/conflict";
import { ClientRepository } from "../repositories/client-repository";
import { PetRepository } from "../repositories/pet-repository";

interface CreateClientUseCaseRequest {
  name: string;
  document: string;
  birthday: string;
  email: string;
  petsId?: string[];
}

export class CreateClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private petRepository: PetRepository
  ) {}

  async execute(input: CreateClientUseCaseRequest): Promise<Client> {
    const emailAlreadyExists = await this.clientRepository.findByDocument(
      input.document
    );

    if (emailAlreadyExists) {
      throw new ConflictError("Email already exists");
    }

    let pets: Pet[] = [];

    if (input.petsId?.length) {
      pets = await this.searchPets(input.petsId)
    }

    const client = Client.create({
      ...input,
      birthday: new Date(input.birthday),
      pets
    });

    await this.clientRepository.save(client);

    return client;
  }

  private async searchPets(ids: string[]): Promise<Pet[]> {
    let pets: Pet[] = [];

    for await (const id of ids) {
      const pet = await this.petRepository.findById(id);
      pets.push(pet);
    }

    return pets;
  }
}
