import { NotFoundError } from "../../../commons/errors/not-found";
import { Pet } from "../../enterprise/entities/pet";
import { PetType } from "../../enterprise/entities/pet-type";
import { OwnerRepository } from "../repositories/owner-repository";
import { PetRepository } from "../repositories/pet-repository";

interface RegisterPetUseCaseRequest {
  ownerId: string;
  name: string;
  birthday: Date;
  species: string;
  breed: string;
  gender: string;
  type: PetType;
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private ownerRepository: OwnerRepository
  ) {}

  async execute(input: RegisterPetUseCaseRequest): Promise<Pet> {
    const owner = await this.ownerRepository.findyById(input.ownerId);

    if (!owner) {
      throw new NotFoundError("Owner doesn't exists");
    }

    const pet = Pet.create(input);

    await this.petRepository.save(pet);

    owner.registerPet(pet);

    await this.ownerRepository.edit(owner);

    return pet;
  }
}
