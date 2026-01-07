import { ForeignKeyNotOptionalValidator } from "./ForeignKeyNotOptional.validator"
import { ForeignKeyOptions } from "../../decorator"
import { Result } from "@andireuter/js-domain-principles"
import { ValidationDecorator } from "../ValidationDecorator"

type ForeignKeyValidationProps = {
  name: string
  value: unknown
  options: ForeignKeyOptions
}

class ForeignKeyValidationDecorator {
  validate(value: ForeignKeyValidationProps): Result<ForeignKeyValidationProps> {
    return (
      new ValidationDecorator<ForeignKeyValidationProps>()
        .add(new ForeignKeyNotOptionalValidator())
        .validate(value)
    )
  }
}

export {
  type ForeignKeyValidationProps,
  ForeignKeyValidationDecorator
}
