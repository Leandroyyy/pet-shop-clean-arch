import { ConflictError } from "@/domain/commons/errors/conflict";
import { Response } from "./response";

const errorMap = new Map<
  number,
  {
    message: string;
    code: number;
  }
>();

errorMap.set(ConflictError.prototype.code, {
  code: ConflictError.prototype.code,
  message: ConflictError.prototype.message,
});

export class ErrorFormatter {
  static handle(error: Error & { code: number }): Response<any> {
    const errorInfo = errorMap.get(error.code);

    if (errorInfo) {
      return {
        body: { message: errorInfo.message },
        code: errorInfo.code,
      };
    }

    return {
      body: [{ message: "Unexpected error occurred" }],
      code: 500,
    };
  }
}
