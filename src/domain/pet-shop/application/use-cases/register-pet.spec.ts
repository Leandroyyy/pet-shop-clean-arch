import { mock, MockProxy } from "jest-mock-extended";
import { makeOwner } from "test/factories/make-owner";
import { PetType } from "../../enterprise/entities/pet-type";
import { OwnerRepository } from "../repositories/owner-repository";
import { PetRepository } from "../repositories/pet-repository";
import { RegisterPetUseCase } from "./register-pet";

describe("Register Pet", () => {
  let petRepository: MockProxy<PetRepository>;
  let ownerRepository: MockProxy<OwnerRepository>;
  let registerPetUseCase: RegisterPetUseCase;

  beforeAll(() => {
    petRepository = mock();
    ownerRepository = mock();
    registerPetUseCase = new RegisterPetUseCase(petRepository, ownerRepository);
  });

  it("should not be able to register pet when owner doesnt exists", async () => {
    ownerRepository.findyById.mockResolvedValue(null);

    await expect(
      registerPetUseCase.execute({
        birthday: "20-10-2000",
        breed: "pintcher",
        gender: "male",
        name: "robsona",
        ownerId: "1",
        type: PetType.DOG,
      })
    ).rejects.toThrow("Owner doesn't exists");
  });

  it("should be able to register a pet", async () => {
    const ownerMock = makeOwner();
    ownerRepository.findyById.mockResolvedValue(ownerMock);

    const pet = await registerPetUseCase.execute({
      birthday: "2020-10-20",
      breed: "pintcher",
      gender: "male",
      name: "robsona",
      ownerId: "1",
      type: PetType.DOG,
    });

    expect(pet).toEqual({
      _id: expect.any(String),
      props: {
        birthday: new Date("2020-10-20"),
        breed: "pintcher",
        gender: "male",
        name: "robsona",
        type: "dog",
      },
    });

    expect(petRepository.save).toHaveBeenCalledTimes(1);
    expect(ownerRepository.edit).toHaveBeenCalledTimes(1);
  });
});
