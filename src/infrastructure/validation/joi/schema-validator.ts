import { SchemaValidator, SchemaValidatorErrors } from "@/adapters/controllers/interfaces/schema-validator";
import { Schema } from "joi";

export class JoiSchemaValidator<T> implements SchemaValidator<T> {
  constructor(private schema: Schema) {}

  execute(data: T): { data: T; errors: SchemaValidatorErrors[] } {
    const { error, value } = this.schema.validate(data, { abortEarly: false });

    if (error) {
      const errors: SchemaValidatorErrors[] = error.details.map((err) => ({
        message: err.message,
        path: String(err.path),
      }));

      return { data: value, errors };
    }

    return { data: value, errors: [] };
  }
}
