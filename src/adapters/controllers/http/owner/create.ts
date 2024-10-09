import { NotFoundError } from "@/domain/commons/errors/not-found";
import { RegisterOwnerUseCase } from "@/domain/pet-shop/application/use-cases/register-owner";
import { HttpRequest } from "../request";
import { HttpResponse } from "../response";
import { Validator } from "../validator";

export class HttpCreateOwnerController {
  constructor(
    private registerOwnerUseCase: RegisterOwnerUseCase,
    private validator: Validator
  ) {}

  async execute(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = request;

      const { data, errors } = this.validator.execute(body);

      if (errors) {
        return {
          body: {},
          statusCode: 400,
        };
      }

      const owner = await this.registerOwnerUseCase.execute(data);

      return {
        body: owner,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        return {
          body: {},
          statusCode: 400,
        };
      }
    }
  }
}
