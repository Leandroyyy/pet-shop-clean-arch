import { ValidationError } from "@/domain/commons/errors/validation";
import {
  RegisterOwnerUseCase,
  RegisterOwnerUseCaseRequest,
} from "@/domain/pet-shop/application/use-cases/register-owner";
import { Owner } from "@/domain/pet-shop/enterprise/entities/owner";
import { ErrorFormatter } from "../interfaces/error-formatter";
import { Request } from "../interfaces/request";
import { Response } from "../interfaces/response";
import { SchemaValidator } from "../interfaces/schema-validator";

export class RegisterOwnerController {
  constructor(
    private registerOwnerUseCase: RegisterOwnerUseCase,
    private validator: SchemaValidator<RegisterOwnerUseCaseRequest>
  ) {}

  async execute(request: Request): Promise<Response<Owner>> {
    try {
      const { body } = request;

      const { data, errors } = this.validator.execute(body);

      if (errors?.length) {
        throw new ValidationError(errors);
      }

      const owner = await this.registerOwnerUseCase.execute(data);

      return {
        body: owner,
        code: 201,
      };
    } catch (error: any) {
      return ErrorFormatter.handle(error);
    }
  }
}
