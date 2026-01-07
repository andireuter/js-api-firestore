import { Instantiable } from "@andireuter/js-domain-principles"

class DecoratorUtils {
  static getPropertyKey<T>(target: Instantiable<T>, metadataKey: string): string | undefined {
    const instance = new target() as T & object

    return (
      Object.getOwnPropertyNames(instance).find(
        (propertyKey) => Reflect.hasMetadata(metadataKey, instance, propertyKey)
      )
    )
  }

  static getPropertyKeys<T>(target: Instantiable<T>, metadataKey: string): string[] | undefined {
    const instance = new target() as T & object

    return (
      Object.getOwnPropertyNames(instance).filter(
        propertyKey => Reflect.hasMetadata(metadataKey, instance, propertyKey)
      )
    )
  }

  static getOptions<T, O>(target: Instantiable<T>, metadataKey: string, propertyKey?: string): O | undefined {
    const instance = new target() as T & object

    if (typeof (propertyKey) !== "undefined") {
      return (Reflect.getMetadata(metadataKey, instance, propertyKey) as O)
    }

    return (Reflect.getMetadata(metadataKey, instance) as O)
  }

  static getOptionKeys<T>(target: Instantiable<T>, propertyKey?: string): string[] | undefined {
    const instance = new target() as T & object

    if (typeof (propertyKey) !== "undefined") {
      return (Reflect.getMetadataKeys(instance, propertyKey))
    }

    return (Reflect.getMetadataKeys(instance))
  }
}

export { DecoratorUtils }
