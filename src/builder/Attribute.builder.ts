import { AttributeOptions, AttributeType } from "../decorator"
import { AttributeUtils, DecoratorUtils } from "../utils"
import {
  AttributeValidationDecorator,
  AttributeValidationProps
} from "../validator"
import { Instantiable, Result } from "@andireuter/js-domain-principles"

import { IEntityBuilder } from "./IEntityBuilder.interface"

class AttributeBuilder<T> implements IEntityBuilder<T> {
  private target: Instantiable<T>
  private attributes: Map<string, unknown>

  constructor(target: Instantiable<T>) {
    this.target = target
    this.attributes = new Map<string, unknown>()
  }

  addAttribute(name: string, value: unknown) {
    this.attributes.set(name, value)
  }

  build(): T {
    const attributeKeys = Array.from(this.attributes.keys())

    return (
      Object.fromEntries(
        attributeKeys.map(name => [
          name as keyof T,
          this.processAttribute(
            name,
            this.attributes.get(name) as unknown
          )
        ])
      ) as T
    )
  }

  private processAttribute(name: string, value: unknown[] | unknown): AttributeType | undefined {
    const attributeKey =
      DecoratorUtils.getPropertyKeys<T>(this.target, "attribute")
        ?.find(attributeKey => attributeKey === name)

    const attributeOptions = DecoratorUtils.getOptions<T, AttributeOptions>(this.target, "attribute", name)

    if (attributeKey && attributeOptions) {
      const validationResult = this.validateAttribute({
        name: attributeKey,
        value,
        options: attributeOptions
      })

      if (validationResult.isFailure) {
        throw validationResult.error
      }

      return (
        AttributeUtils.castType<AttributeType>(value, attributeOptions.type)
      )
    }
  }

  private validateAttribute(value: AttributeValidationProps): Result<AttributeValidationProps> {
    return (
      new AttributeValidationDecorator()
        .validate(value)
    )
  }
}

export { AttributeBuilder }
