import { PetRepository } from "@/domain/pet-shop/application/repositories/pet-repository";
import { Pet } from "@/domain/pet-shop/enterprise/entities/pet";
import { DatabaseSource, DbParams } from "../database-source";
import { PetDbSchema } from "./dtos/pet-db-schema";

export class PetRepositoryGateway implements PetRepository {
  constructor(private databaseSource: DatabaseSource<PetDbSchema>) {}

  async save(pet: Pet): Promise<void> {
    const parameters: DbParams<PetDbSchema>[] = [];
    parameters.push({ field: "id", value: pet.id });
    parameters.push({ field: "name", value: pet.name });
    parameters.push({ field: "birthday", value: pet.birthday });
    parameters.push({ field: "breed", value: pet.breed });
    parameters.push({ field: "gender", value: pet.gender });
    parameters.push({ field: "type", value: pet.type });

    await this.databaseSource.insert(parameters);
  }
}
