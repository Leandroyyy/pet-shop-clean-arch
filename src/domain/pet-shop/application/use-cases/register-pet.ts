import { NotFoundError } from "@/domain/commons/errors/not-found";
import { Pet } from "../../enterprise/entities/pet";
import { PetType } from "../../enterprise/entities/pet-type";
import { OwnerRepository } from "../repositories/owner-repository";
import { PetRepository } from "../repositories/pet-repository";

interface RegisterPetUseCaseRequest {
  ownerId: string;
  name: string;
  birthday: string;
  breed: string;
  gender: "male" | "female";
  type: PetType;
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private ownerRepository: OwnerRepository
  ) {}

  async execute({
    birthday,
    breed,
    gender,
    name,
    ownerId,
    type,
  }: RegisterPetUseCaseRequest): Promise<Pet> {
    const owner = await this.ownerRepository.findyById(ownerId);

    if (!owner) {
      throw new NotFoundError("Owner doesn't exists");
    }

    const pet = Pet.create({
      breed,
      gender,
      name,
      type,
      birthday: new Date(birthday),
    });

    await this.petRepository.save(pet);

    owner.registerPet(pet);

    await this.ownerRepository.edit(owner);

    return pet;
  }
}
