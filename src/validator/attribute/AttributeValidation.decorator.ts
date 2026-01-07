import { AttributeNotOptionalValidator } from "./AttributeNotOptional.validator"
import { AttributeOptions } from "../../decorator"
import { AttributeTypeValidator } from "./AttributeType.validator"
import { Result } from "@andireuter/js-domain-principles"
import { ValidationDecorator } from "../ValidationDecorator"

type AttributeValidationProps = {
  name: string
  value: unknown
  options: AttributeOptions
}

class AttributeValidationDecorator {
  validate(value: AttributeValidationProps): Result<AttributeValidationProps> {
    return (
      new ValidationDecorator<AttributeValidationProps>()
        .add(new AttributeTypeValidator())
        .add(new AttributeNotOptionalValidator())
        .validate(value)
    )
  }
}

export {
  type AttributeValidationProps,
  AttributeValidationDecorator
}
