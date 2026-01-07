import { Result } from "@andireuter/js-domain-principles"
import { EntityKeyNotUndefinedValidator } from "./EntityKeyNotUndefined.validator"
import { EntityKeyOptions } from "../../decorator"
import { EntityKeyTypeValidator } from "./EntityKeyType.validator"
import { ValidationDecorator } from "../ValidationDecorator"

type EntityKeyValidationProps = {
  name: string
  value: unknown
  options: EntityKeyOptions
}

class EntityKeyValidationDecorator {
  validate(value: EntityKeyValidationProps): Result<EntityKeyValidationProps> {
    return (
      new ValidationDecorator<EntityKeyValidationProps>()
        .add(new EntityKeyTypeValidator())
        .add(new EntityKeyNotUndefinedValidator())
        .validate(value)
    )
  }
}

export {
  type EntityKeyValidationProps,
  EntityKeyValidationDecorator
}
