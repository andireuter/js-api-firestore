import { AttributeObjectNotOptionalValidator } from "./AttributeObjectNotOptional.validator"
import { AttributeObjectOptions } from "../../decorator"
import { AttributeObjectTypeValidator } from "./AttributeObjectType.validator"
import { Result } from "@andireuter/js-domain-principles"
import { ValidationDecorator } from "../ValidationDecorator"

type AttributeObjectValidationProps = {
  name: string
  value: unknown
  options: AttributeObjectOptions
}

class AttributeObjectValidationDecorator {
  validate(value: AttributeObjectValidationProps): Result<AttributeObjectValidationProps> {
    return (
      new ValidationDecorator<AttributeObjectValidationProps>()
        .add(new AttributeObjectTypeValidator())
        .add(new AttributeObjectNotOptionalValidator())
        .validate(value)
    )
  }
}

export {
  type AttributeObjectValidationProps,
  AttributeObjectValidationDecorator
}
