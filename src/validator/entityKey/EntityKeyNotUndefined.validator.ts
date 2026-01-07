import { IValidator, Result } from "@andireuter/js-domain-principles"

import { EntityKeyNotUndefinedError } from "../../error"
import { EntityKeyValidationProps } from "./EntityKeyValidation.decorator"

class EntityKeyNotUndefinedValidator implements IValidator<EntityKeyValidationProps> {
  validate(value: EntityKeyValidationProps): Result<EntityKeyValidationProps> {
    if (!value.value) {
      return (
        Result.fail<EntityKeyValidationProps>(new EntityKeyNotUndefinedError(value.name))
      )
    }

    return (Result.ok<EntityKeyValidationProps>())
  }
}

export { EntityKeyNotUndefinedValidator }
