import { AttributeObjectType, AttributeType } from "../decorator"

import { CollectionReference } from "@google-cloud/firestore"

class AttributeUtils {
  static shiftByKey<T>(key: string, target: T): T {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key as keyof T]: _, ...shiftedTarget } = target
    return (shiftedTarget as T)
  }

  static shiftByKeys<T>(keys: string[], target: T): T {
    let shiftedTarget = { ...target }

    keys.forEach(key => {
      shiftedTarget = this.shiftByKey(key, shiftedTarget)
    })

    return (shiftedTarget as T)
  }

  static findIdByKey<T>(idKey: string, target: T): string {
    return (target[idKey as keyof T] as string)
  }

  static findIdByKeyOrGetId<T>(idKey: string, target: T, collection: CollectionReference<T>): string {
    let id = AttributeUtils.findIdByKey(idKey, target)

    if (!id) {
      id = collection.doc().id
    }

    return (id)
  }

  static isListOfIds(value: unknown[]): value is string[] {
    return (
      Array.isArray(value) && value.length > 0 && value.every(value => typeof value === "string")
    )
  }

  static reduceToIds(idKey: string, value: unknown[]): string[] {
    return (value.map((value: unknown) => AttributeUtils.findIdByKey(idKey, value)))
  }

  static castType<T>(value: unknown, valueType: AttributeType | AttributeObjectType): T {
    switch (valueType) {
      case "string":
        return (value as unknown) as T
      case "number":
        return (value as unknown) as T
      case "bool":
        return (value as unknown) as T
      case "object":
        return (value as unknown) as T
      case "array":
        return (value as unknown) as T
      case "map":
        return (value as unknown) as T
      default:
        throw new Error(`Cannot cast value because of unknown value type: ${valueType}.`)
    }
  }
}

export { AttributeUtils }
