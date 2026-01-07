import { IValidator, Result } from "@andireuter/js-domain-principles"

import { AttributeObjectNotOptionalError } from "../../error"
import { AttributeObjectValidationProps } from "./AttributeObjectValidation.decorator"

class AttributeObjectNotOptionalValidator implements IValidator<AttributeObjectValidationProps> {
  validate(value: AttributeObjectValidationProps): Result<AttributeObjectValidationProps> {
    if (!value.options.optional && value.value === undefined) {
      return (
        Result.fail<AttributeObjectValidationProps>(new AttributeObjectNotOptionalError(value.name))
      )
    }

    return (Result.ok<AttributeObjectValidationProps>())
  }
}

export { AttributeObjectNotOptionalValidator }
