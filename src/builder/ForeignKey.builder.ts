import { AttributeUtils, DecoratorUtils } from "../utils"
import { FieldPath, Filter } from "@google-cloud/firestore"
import { ForeignKeyValidationDecorator, ForeignKeyValidationProps } from "../validator"
import { Instantiable, Result } from "@andireuter/js-domain-principles"

import { EntityDirector } from "./Entity.director"
import { FirestoreRepository } from "../persistence"
import { ForeignKeyOptions } from "../decorator"
import { IEntityBuilder } from "./IEntityBuilder.interface"

class ForeignKeyBuilder<T> implements IEntityBuilder<T> {
  private target: Instantiable<T>
  private foreignKeys: Map<string, unknown[]>

  constructor(target: Instantiable<T>) {
    this.target = target
    this.foreignKeys = new Map<string, unknown[]>()
  }

  addForeignKey(name: string, value: unknown[]) {
    this.foreignKeys.set(name, value)
  }

  async build(): Promise<T> {
    const foreignKeys = Array.from(this.foreignKeys.keys())

    return (
      Object.fromEntries(await Promise.all(
        foreignKeys.map(async name => [
          name as keyof T,
          await this.processForeignKey(
            name,
            this.foreignKeys.get(name) as unknown[]
          )
        ]))
      )
    )
  }

  private async processForeignKey(name: string, value: unknown[]): Promise<unknown[] | undefined> {
    const foreignKey =
      DecoratorUtils.getPropertyKeys(this.target, "foreignKey")
        ?.find(foreignKey => foreignKey === name)

    if (foreignKey) {
      const foreignKeyOptions = DecoratorUtils.getOptions<T, ForeignKeyOptions>(this.target, "foreignKey", foreignKey)

      if (foreignKeyOptions) {
        const validationResult = this.validateForeignKey({
          name: foreignKey,
          value,
          options: foreignKeyOptions
        })

        if (validationResult.isFailure) {
          throw validationResult.error
        }

        if (AttributeUtils.isListOfIds(value)) {
          console.log("is list of ids")
          const foreignKeys = await this.fetchForeignKey(foreignKeyOptions, value as string[])

          if (foreignKeys) {
            return (this.constructForeignKey(foreignKeyOptions, foreignKeys))
          }
        } else {
          console.log("is list of objects")
          return (this.constructForeignKey(foreignKeyOptions, value as unknown[]))
        }
      }
    }
  }

  private async constructForeignKey(foreignKeyOptions: ForeignKeyOptions, foreignKeys: unknown[]): Promise<unknown[]> {
    const foreignKeyEntities: unknown[] = []

    foreignKeys.forEach(async foreignKeyProps => {
      const foreignKeyResult = await new EntityDirector(foreignKeyOptions.collection, foreignKeyProps)
        .construct()

      if (foreignKeyResult.isFailure) {
        return (Promise.reject(foreignKeyResult.error))
      }

      foreignKeyEntities.push(foreignKeyResult.value)
    })

    return (foreignKeyEntities)
  }

  private async fetchForeignKey(foreignKeyOptions: ForeignKeyOptions, ids: string[]): Promise<unknown[] | undefined> {
    const firestoreRepository = new FirestoreRepository()
    return (await firestoreRepository.find<unknown>(
      foreignKeyOptions.collection,
      Filter.where(FieldPath.documentId(), "in", ids)
    ))
  }

  private validateForeignKey(value: ForeignKeyValidationProps): Result<ForeignKeyValidationProps> {
    return (
      new ForeignKeyValidationDecorator()
        .validate(value)
    )
  }
}

export { ForeignKeyBuilder }
