import { IValidator, Result } from "@andireuter/js-domain-principles"

import { AttributeTypeError } from "../../error"
import { AttributeValidationProps } from "./AttributeValidation.decorator"

class AttributeTypeValidator implements IValidator<AttributeValidationProps> {
  validate(value: AttributeValidationProps): Result<AttributeValidationProps> {
    if (value.value !== undefined && typeof value.value !== value.options.type && !this.isBool(value.value, value.options.type) && !(value.options.type === "number" && this.isNumberArray(value.value)) && !(value.options.type === "string" && this.isStringArray(value.value))) {
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

  private isNumberArray(value: unknown): value is number[] {
    return (
      Array.isArray(value) &&
      value.every(v => typeof v === "number")
    )
  }

  private isStringArray(value: unknown): value is string[] {
    return (
      Array.isArray(value) &&
      value.every(v => typeof v === "string")
    )
  }
}

export { AttributeTypeValidator }
