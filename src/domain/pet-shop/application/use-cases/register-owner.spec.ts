import { mock, MockProxy } from "jest-mock-extended";
import { makeOwner } from "test/factories/make-owner";
import { OwnerRepository } from "../repositories/owner-repository";
import { RegisterOwnerUseCase } from "./register-owner";

describe("Register Owner", () => {
  let ownerRepository: MockProxy<OwnerRepository>;
  let registerOwnerUseCase: RegisterOwnerUseCase;

  beforeAll(() => {
    ownerRepository = mock();
    registerOwnerUseCase = new RegisterOwnerUseCase(ownerRepository);
  });

  it("should not be able to register an owner when email already exists", async () => {
    const owner = makeOwner();

    ownerRepository.findByDocument.mockResolvedValue(owner);

    await expect(
      registerOwnerUseCase.execute({
        birthday: "2000-10-20",
        document: "123123213",
        email: "john@due.com",
        name: "johndue",
      })
    ).rejects.toThrow("Email already exists");
  });
});
