import { ConflictError } from "../../../commons/errors/conflict";
import { Owner } from "../../enterprise/entities/owner";
import { OwnerRepository } from "../repositories/owner-repository";

interface RegisterOwnerUseCaseRequest {
  name: string;
  document: string;
  birthday: string;
  email: string;
}

export class RegisterOwnerUseCase {
  constructor(private ownerRepository: OwnerRepository) {}

  async execute(input: RegisterOwnerUseCaseRequest): Promise<Owner> {
    const emailAlreadyExists = await this.ownerRepository.findByDocument(
      input.document
    );

    if (emailAlreadyExists) {
      throw new ConflictError("Email already exists");
    }

    const owner = Owner.create({
      ...input,
      birthday: new Date(input.birthday),
    });

    await this.ownerRepository.save(owner);

    return owner;
  }
}
