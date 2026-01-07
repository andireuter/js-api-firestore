import { IValidator, Result } from "@andireuter/js-domain-principles"

import { EntityKeyTypeError } from "../../error"
import { EntityKeyValidationProps } from "./EntityKeyValidation.decorator"

class EntityKeyTypeValidator implements IValidator<EntityKeyValidationProps> {
  validate(value: EntityKeyValidationProps): Result<EntityKeyValidationProps> {
    if (value.value !== undefined && typeof value.value !== value.options.type) {
      return (
        Result.fail<EntityKeyValidationProps>(new EntityKeyTypeError(value.name, value.options.type))
      )
    }

    return (Result.ok<EntityKeyValidationProps>())
  }
}

export { EntityKeyTypeValidator }
