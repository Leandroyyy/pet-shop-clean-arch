import {
  RegisterPetUseCase,
  RegisterPetUseCaseRequest,
} from "@/domain/pet-shop/application/use-cases/register-pet";
import { Pet } from "@/domain/pet-shop/enterprise/entities/pet";
import { ErrorFormatter } from "../interfaces/error-formatter";
import { Request } from "../interfaces/request";
import { Response } from "../interfaces/response";
import { SchemaValidator } from "../interfaces/schema-validator";

export class RegisterPetController {
  constructor(
    private registerPetUseCase: RegisterPetUseCase,
    private validator: SchemaValidator<RegisterPetUseCaseRequest>
  ) {}

  async execute(request: Request): Promise<Response<Pet>> {
    try {
      const { body } = request;

      const { data, errors } = this.validator.execute(body);

      if (errors?.length) {
        return {
          code: 400,
          body: errors,
        };
      }

      const pet = await this.registerPetUseCase.execute(data);

      return {
        body: pet,
        code: 201,
      };
    } catch (error: any) {
      return ErrorFormatter.handle(error);
    }
  }
}
