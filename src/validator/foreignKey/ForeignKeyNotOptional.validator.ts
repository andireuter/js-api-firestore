import { IValidator, Result } from "@andireuter/js-domain-principles"

import { ForeignKeyNotOptionalError } from "../../error"
import { ForeignKeyValidationProps } from "./ForeignKeyValidation.decorator"

class ForeignKeyNotOptionalValidator implements IValidator<ForeignKeyValidationProps> {
  validate(value: ForeignKeyValidationProps): Result<ForeignKeyValidationProps> {
    if (value.options.optional === false && (value.value === undefined || (value.value as unknown[]).length == 0)) {
      return (
        Result.fail<ForeignKeyValidationProps>(new ForeignKeyNotOptionalError(value.name))
      )
    }

    return (Result.ok<ForeignKeyValidationProps>())
  }
}

export { ForeignKeyNotOptionalValidator }
