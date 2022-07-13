import { Schema } from 'joi';

export class Validate {
  public static againstSchema<T = any>(schema: Schema, value: any) {
    const result = schema.validate(value);

    if (result.error) {
      return {
        succeeded: false,
        message: result.error.message,
        errors: result.error?.details,
      };
    } else {
      return { succeeded: true, value: result.value as T };
    }
  }
}
