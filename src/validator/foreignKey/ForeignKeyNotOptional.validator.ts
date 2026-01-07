import { IValidator, Result } from "@andireuter/js-domain-principles"

import { ForeignKeyNotOptionalError } from "../../error"
import { ForeignKeyValidationProps } from "./ForeignKeyValidation.decorator"

class ForeignKeyNotOptionalValidator implements IValidator<ForeignKeyValidationProps> {
  validate(value: ForeignKeyValidationProps): Result<ForeignKeyValidationProps> {
    if (!value.options.optional && value.value === undefined) {
      return (
        Result.fail<ForeignKeyValidationProps>(new ForeignKeyNotOptionalError(value.name))
      )
    }

    return (Result.ok<ForeignKeyValidationProps>())
  }
}

export { ForeignKeyNotOptionalValidator }
