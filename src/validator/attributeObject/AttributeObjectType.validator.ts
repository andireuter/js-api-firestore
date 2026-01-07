import { IValidator, Result } from "@andireuter/js-domain-principles"

import { AttributeObjectTypeError } from "../../error"
import { AttributeObjectValidationProps } from "./AttributeObjectValidation.decorator"

class AttributeObjectTypeValidator implements IValidator<AttributeObjectValidationProps> {
  validate(value: AttributeObjectValidationProps): Result<AttributeObjectValidationProps> {
    if (value.value !== undefined && !this.isArray(value.value, value.options.type) && !this.isMap(value.value, value.options.type)) {
      return (
        Result.fail<AttributeObjectValidationProps>(
          new AttributeObjectTypeError(value.name, value.options.type)
        )
      )
    }

    return (Result.ok<AttributeObjectValidationProps>())
  }

  private isArray(value: unknown, type: string): boolean {
    if (type === "array" && value instanceof Array) {
      return (true)
    }

    return (false)
  }

  private isMap(value: unknown, type: string): boolean {
    if (type === "map" && typeof value === "object" && !(value instanceof Array)) {
      return (true)
    }

    return (false)
  }
}

export { AttributeObjectTypeValidator }
