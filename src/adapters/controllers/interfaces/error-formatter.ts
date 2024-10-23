import { ConflictError } from "@/domain/commons/errors/conflict";
import { NotFoundError } from "@/domain/commons/errors/not-found";
import { Response } from "./response";

const errorMap = new Map<
  number,
  {
    message: string;
    code: number;
  }
>();

type ErrorMapping = [new (...args: any[]) => Error, number];

export class ErrorFormatter {
  private static errorMap: ErrorMapping[] = [
    [NotFoundError, 404],
    [ConflictError, 409],
  ];

  static handle(error: Error & { code: number }): Response<any> {
    const foundError = this.errorMap.find(
      ([ErrorClass]) => error instanceof ErrorClass
    );
    const code = foundError ? foundError[1] : 500;
    let { message } = error;

    if (code === 500) {
      message = "Unexpected Error";
    }

    return {
      body: [{ message }],
      code,
    };
  }
}
