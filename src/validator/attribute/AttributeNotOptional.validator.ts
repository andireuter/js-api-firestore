import { IValidator, Result } from "@andireuter/js-domain-principles"

import { AttributeNotOptionalError } from "../../error"
import { AttributeValidationProps } from "./AttributeValidation.decorator"

class AttributeNotOptionalValidator implements IValidator<AttributeValidationProps> {
  validate(value: AttributeValidationProps): Result<AttributeValidationProps> {
    if (value.options.optional === false && (value.value === undefined || (value.value as unknown[]).length == 0)) {
      return (
        Result.fail<AttributeValidationProps>(new AttributeNotOptionalError(value.name))
      )
    }

    return (Result.ok<AttributeValidationProps>())
  }
}

export { AttributeNotOptionalValidator }
