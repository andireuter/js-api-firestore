import { IValidator, Result } from "@andireuter/js-domain-principles"

import { AttributeTypeError } from "../../error"
import { AttributeValidationProps } from "./AttributeValidation.decorator"

class AttributeTypeValidator implements IValidator<AttributeValidationProps> {
  validate(value: AttributeValidationProps): Result<AttributeValidationProps> {
    if (value.value !== undefined && typeof value.value !== value.options.type && !this.isBool(value.value, value.options.type)) {
      return (
        Result.fail<AttributeValidationProps>(new AttributeTypeError(value.name, value.options.type))
      )
    }

    return (Result.ok<AttributeValidationProps>())
  }

  private isBool(value: unknown, type: string): boolean {
    if (type === "bool" && typeof value === "boolean") {
      return (true)
    }

    return (false)
  }
}

export { AttributeTypeValidator }
