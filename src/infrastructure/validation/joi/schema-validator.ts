import { SchemaValidator } from "@/adapters/controllers/interfaces/schema-validator";
import { Schema } from "joi";

export class JoiSchemaValidator<T> implements SchemaValidator<T> {
  constructor(private schema: Schema) {}

  execute(data: T): { data: T; errors: any[] } {
    const { error, value } = this.schema.validate(data, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => ({
        message: err.message,
        path: err.path,
      }));

      return { data: value, errors };
    }

    return { data: value, errors: [] };
  }
}
