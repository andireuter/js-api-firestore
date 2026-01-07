import { AttributeUtils, DecoratorUtils } from "../utils"
import {
  EntityKeyOptions,
  EntityKeyType
} from "../decorator"
import {
  EntityKeyValidationDecorator,
  EntityKeyValidationProps
} from "../validator"
import { Instantiable, Result } from "@andireuter/js-domain-principles"

import { IEntityBuilder } from "./IEntityBuilder.interface"

class EntityKeyBuilder<T> implements IEntityBuilder<T> {
  private target: Instantiable<T>
  private entityKeys: Map<string, unknown>

  constructor(target: Instantiable<T>) {
    this.target = target
    this.entityKeys = new Map<string, unknown>()
  }

  addEntityKey(name: string, value: unknown) {
    this.entityKeys.set(name, value)
  }

  build(): T {
    const entityKeys = Array.from(this.entityKeys.keys())

    return (
      Object.fromEntries(
        entityKeys.map(name => [
          name as keyof T,
          this.processEntityKey(
            name,
            this.entityKeys.get(name) as unknown
          )
        ])
      ) as T
    )
  }

  private processEntityKey(name: string, value: unknown): EntityKeyType | undefined {
    const entityKey =
      DecoratorUtils.getPropertyKeys<T>(this.target, "entityKey")
        ?.find(entityKey => entityKey === name)

    const entityKeyOptions = DecoratorUtils.getOptions<T, EntityKeyOptions>(this.target, "entityKey", name)

    if (entityKey && entityKeyOptions) {
      const validationResult = this.validateEntityKey({
        name: entityKey,
        value,
        options: entityKeyOptions
      })

      if (validationResult.isFailure) {
        throw validationResult.error
      }

      return (
        AttributeUtils.castType<EntityKeyType>(value, entityKeyOptions.type)
      )
    }
  }

  private validateEntityKey(value: EntityKeyValidationProps): Result<EntityKeyValidationProps> {
    return (
      new EntityKeyValidationDecorator()
        .validate(value)
    )
  }
}

export { EntityKeyBuilder }
