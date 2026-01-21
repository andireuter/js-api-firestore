import { Instantiable, Result } from "@andireuter/js-domain-principles"

import { AttributeBuilder } from "./Attribute.builder"
import { DecoratorUtils } from "../utils"
import { EntityKeyBuilder } from "./EntityKey.builder"
import { EntityKeyNotFoundError } from "../error"
import { ForeignKeyBuilder } from "./ForeignKey.builder"

class EntityDirector<T> {
  private readonly target: Instantiable<T>
  private targetProps: T

  constructor(target: Instantiable<T>, targetProps: T) {
    this.target = target
    this.targetProps = targetProps
  }

  async construct(): Promise<Result<T>> {
    try {
      const entityResult: T & object = {} as T & object

      Object.assign<T & object, T>(entityResult, this.attributeBuilder())
      Object.assign<T & object, T>(entityResult, await this.foreignKeyBuilder())
      Object.assign<T & object, T>(entityResult, this.entityKeyBuilder())

      return (Result.ok<T>(entityResult))
    } catch (error: unknown) {
      return (Result.fail<T>(error as Error))
    }
  }

  async test(): Promise<Result<T>> {
    try {
      this.attributeBuilder()
      await this.foreignKeyBuilder()
      this.entityKeyBuilder()

      return (Result.ok<T>())
    } catch (error: unknown) {
      return (Result.fail<T>(error as Error))
    }
  }

  private attributeBuilder(): T {
    const attributeKeys = DecoratorUtils.getPropertyKeys(this.target, "attribute")

    const attributeBuilder = new AttributeBuilder<T>(this.target)

    attributeKeys?.forEach(attributeKey => {
      attributeBuilder.addAttribute(
        attributeKey,
        this.targetProps[attributeKey as keyof T]
      )
    })

    return (attributeBuilder.build())
  }

  private async foreignKeyBuilder(): Promise<T> {
    const foreignKeys = DecoratorUtils.getPropertyKeys(this.target, "foreignKey")

    const foreignKeyBuilder = new ForeignKeyBuilder<T>(this.target)

    foreignKeys?.forEach(foreignKey => {
      foreignKeyBuilder.addForeignKey(
        foreignKey,
        this.targetProps[foreignKey as keyof T] as unknown[]
      )
    })

    return (await foreignKeyBuilder.build())
  }

  private entityKeyBuilder(): T {
    const entityKey = DecoratorUtils.getPropertyKey(this.target, "entityKey")

    if (!entityKey) {
      throw new EntityKeyNotFoundError()
    }

    const entityKeyBuilder = new EntityKeyBuilder<T>(this.target)
    entityKeyBuilder.addEntityKey(
      entityKey,
      this.targetProps[entityKey as keyof T]
    )

    return (entityKeyBuilder.build())
  }
}

export { EntityDirector }
