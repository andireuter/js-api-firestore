import { AttributeObjectOptions, AttributeObjectType } from "../decorator"
import {
  AttributeObjectValidationDecorator,
  AttributeObjectValidationProps
} from "../validator"
import { AttributeUtils, DecoratorUtils } from "../utils"
import { Instantiable, Result } from "@andireuter/js-domain-principles"

import { IEntityBuilder } from "./IEntityBuilder.interface"

class AttributeObjectBuilder<T> implements IEntityBuilder<T> {
  private target: Instantiable<T>
  private attributeObjects: Map<string, unknown>

  constructor(target: Instantiable<T>) {
    this.target = target
    this.attributeObjects = new Map<string, unknown>()
  }

  addAttributeObject(name: string, value: unknown) {
    this.attributeObjects.set(name, value)
  }

  build(): T {
    const attributeObjects = Array.from(this.attributeObjects.keys())

    return (
      Object.fromEntries(
        attributeObjects.map(name => [
          name as keyof T,
          this.processAttributeObject(
            name,
            this.attributeObjects.get(name) as unknown
          )
        ])
      ) as T
    )
  }

  private processAttributeObject(name: string, value: unknown): AttributeObjectType | undefined {
    const attributeObjectKey =
      DecoratorUtils.getPropertyKeys<T>(this.target, "attributeObject")
        ?.find(attributeObjectKey => attributeObjectKey === name)

    const attributeObjectOptions = DecoratorUtils.getOptions<T, AttributeObjectOptions>(this.target, "attributeObject", name)

    if (attributeObjectKey && attributeObjectOptions) {
      const validationResult = this.validateAttributeObject({
        name: attributeObjectKey,
        value,
        options: attributeObjectOptions
      })

      if (validationResult.isFailure) {
        throw validationResult.error
      }

      return (
        AttributeUtils.castType<AttributeObjectType>(value, attributeObjectOptions.type)
      )
    }
  }

  private validateAttributeObject(value: AttributeObjectValidationProps): Result<AttributeObjectValidationProps> {
    return (
      new AttributeObjectValidationDecorator()
        .validate(value)
    )
  }
}

export { AttributeObjectBuilder }
