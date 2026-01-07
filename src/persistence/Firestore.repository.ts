import {
  AttributeUtils,
  CollectionUtils,
  DecoratorUtils
} from "../utils"
import {
  Filter,
  Firestore,
} from "@google-cloud/firestore"

import {
  EntityKeyNotFoundError
} from "../error"
import { ForeignKeyOptions } from "../decorator"
import { Instantiable } from "@andireuter/js-domain-principles"

class FirestoreRepository {
  private readonly firestore: Firestore

  constructor() {
    this.firestore = new Firestore({
      ignoreUndefinedProperties: true,
      preferRest: true
    })
  }

  async insert<T>(target: Instantiable<T>, targetProps: T): Promise<T | undefined> {
    const entityKey = DecoratorUtils.getPropertyKey(target, "entityKey")

    if (!entityKey) {
      throw new EntityKeyNotFoundError()
    }

    const collection = CollectionUtils.collection(target, this.firestore)

    if (collection) {
      return (
        await this.writeBatch(() => {
          const foreignKeyProps = this.processForeignKeys(target, targetProps)

          const id = AttributeUtils.findIdByKeyOrGetId(entityKey, targetProps, collection)
          const foreignKeyIds = this.reduceForeignKeyToIds(target, foreignKeyProps)

          const shiftedTargetProps = AttributeUtils.shiftByKey(entityKey, targetProps)
          const shiftedForeignKeyProps = this.shiftForeignKeys(target, shiftedTargetProps)

          if (shiftedForeignKeyProps) {
            collection.doc(id).set({
              ...shiftedForeignKeyProps,
              ...foreignKeyIds
            })

            return ({
              ...shiftedForeignKeyProps,
              ...foreignKeyProps,
              [entityKey]: id
            } as T)
          }
        })
      )
    }
  }

  async changeById<T extends Partial<unknown>>(target: Instantiable<T>, targetProps: T): Promise<T | undefined> {
    const entityKey = DecoratorUtils.getPropertyKey(target, "entityKey")

    if (!entityKey) {
      throw new EntityKeyNotFoundError()
    }

    const collection = CollectionUtils.collection(target, this.firestore)

    if (collection) {
      const id = AttributeUtils.findIdByKey(entityKey, targetProps)
      const shiftedTargetProps = AttributeUtils.shiftByKey(entityKey, targetProps)

      await collection.doc(id).set(shiftedTargetProps, { merge: true })

      return ({
        ...shiftedTargetProps,
        [entityKey]: id
      } as T)
    }
  }

  async writeBatch<T>(callback: () => T | undefined): Promise<T | undefined> {
    const batch = this.firestore.batch()
    const batchResult = callback()
    await batch.commit()
    return (batchResult)
  }

  async findById<T>(target: Instantiable<T>, id: string): Promise<T | undefined> {
    const collection = CollectionUtils.collection(target, this.firestore)

    if (collection) {
      const docSnap = await collection.doc(id).get()

      if (docSnap.exists) {
        return ({
          ...docSnap.data(),
          id: docSnap.id,
        } as T)
      }
    }
  }

  async find<T>(target: Instantiable<T>, filter: Filter): Promise<T[] | undefined> {
    const collection = CollectionUtils.collection(target, this.firestore)

    if (collection) {
      const querySnap = await collection.where(filter).get()

      if (!querySnap.empty) {
        return (querySnap.docs.map(docSnap => ({
          ...docSnap.data(),
          id: docSnap.id,
        }) as T))
      }
    }
  }

  async fetch<T>(target: Instantiable<T>): Promise<T[] | undefined> {
    const collection = CollectionUtils.collection(target, this.firestore)

    if (collection) {
      const querySnap = await collection.get()

      if (!querySnap.empty) {
        return (querySnap.docs.map(docSnap => ({
          ...docSnap.data(),
          id: docSnap.id,
        }) as T))
      }
    }
  }

  async deleteById<T>(target: Instantiable<T>, id: string): Promise<void> {
    const collection = CollectionUtils.collection(target, this.firestore)

    if (collection) {
      await collection.doc(id).delete()
    }
  }

  private shiftForeignKeys<T>(target: Instantiable<T>, targetProps: T): T | undefined {
    const foreignKeys =
      DecoratorUtils.getPropertyKeys(target, "foreignKey")

    if (foreignKeys) {
      return (AttributeUtils.shiftByKeys(foreignKeys, targetProps))
    }
  }

  private reduceForeignKeyToIds<T>(target: Instantiable<T>, targetProps: T): T | undefined {
    const foreignKeys =
      DecoratorUtils.getPropertyKeys(target, "foreignKey")

    if (foreignKeys) {
      return (
        Object.fromEntries(
          foreignKeys.map(foreignKey => {
            const foreignKeyOptions = DecoratorUtils.getOptions<T, ForeignKeyOptions>(target, "foreignKey", foreignKey)

            if (foreignKeyOptions) {
              const entityKey = DecoratorUtils.getPropertyKey(foreignKeyOptions.collection, "entityKey")

              if (!entityKey) {
                throw new EntityKeyNotFoundError()
              }

              const foreignKeyProps = targetProps[foreignKey as keyof T] as unknown[]

              return ([
                foreignKey as keyof T,
                AttributeUtils.reduceToIds(entityKey, foreignKeyProps)
              ])
            }

            return ([
              foreignKey as keyof T,
            ])
          })
        ) as T
      )
    }
  }

  private processForeignKeys<T>(target: Instantiable<T>, targetProps: T): T | undefined {
    const foreignKeys =
      DecoratorUtils.getPropertyKeys(target, "foreignKey")

    if (foreignKeys) {
      return (
        Object.fromEntries(
          foreignKeys.map(foreignKey => {
            const foreignKeyOptions = DecoratorUtils.getOptions<T, ForeignKeyOptions>(target, "foreignKey", foreignKey)
            const foreignKeyProps = targetProps[foreignKey as keyof T] as unknown[]

            if (foreignKeyOptions) {
              return ([
                foreignKey as keyof T,
                this.processForeignKey(foreignKeyOptions, foreignKey, foreignKeyProps)
              ])
            }

            return ([
              foreignKey as keyof T,
            ])
          })
        ) as T
      )
    }
  }

  private processForeignKey<T>(foreignKeyOptions: ForeignKeyOptions, foreignKey: string, foreignKeyProps: T[]): T | undefined {
    return (
      foreignKeyProps.map(
        foreignKeyProps => this.insertForeignKey(foreignKeyOptions, foreignKey, foreignKeyProps)
      ) as T
    )
  }

  private insertForeignKey<T>(foreignKeyOptions: ForeignKeyOptions, foreignKey: string, foreignKeyProps: T): T | undefined {
    const entityKey = DecoratorUtils.getPropertyKey(foreignKeyOptions.collection, "entityKey")

    if (!entityKey) {
      throw new EntityKeyNotFoundError()
    }

    const collection = CollectionUtils.collection(foreignKeyOptions.collection, this.firestore)

    if (collection) {
      const id = AttributeUtils.findIdByKeyOrGetId(foreignKey, foreignKeyProps, collection)
      const shiftedForeignKeyProps = AttributeUtils.shiftByKey(foreignKey, foreignKeyProps)

      collection.doc(id).set(shiftedForeignKeyProps)

      return ({
        ...shiftedForeignKeyProps,
        [entityKey]: id
      } as T)
    }
  }
}

export { FirestoreRepository }
