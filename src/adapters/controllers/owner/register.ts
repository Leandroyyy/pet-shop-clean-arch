import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
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
    private sendNotificationUseCase: SendNotificationUseCase,
    private validator: SchemaValidator<RegisterOwnerUseCaseRequest>
  ) {}

  async execute(request: Request): Promise<Response<Owner>> {
    try {
      const { body } = request;

      const { data, errors } = this.validator.execute(body);

      if (errors?.length) {
        return {
          code: 400,
          body: errors,
        };
      }

      const owner = await this.registerOwnerUseCase.execute(data);

      await this.sendNotificationUseCase.execute({
        title: "Petshop Register",
        content: `Thanks for your registration here in our petshop ${owner.name}`,
        recipientEmail: owner.email,
      });

      return {
        body: owner,
        code: 201,
      };
    } catch (error: any) {
      return ErrorFormatter.handle(error);
    }
  }
}
