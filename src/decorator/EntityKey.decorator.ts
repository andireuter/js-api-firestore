type EntityKeyType = "string"

interface EntityKeyOptions {
  /**
   * Type of the entity key.
   */
  type: EntityKeyType
}

/**
 * Decorator that marks a property to be an entity key.
 */
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
const EntityKey = (options: EntityKeyOptions): PropertyDecorator => (target: Object, propertyKey: string | symbol) => Reflect.defineMetadata("entityKey", options, target, propertyKey)

export {
  type EntityKeyOptions,
  type EntityKeyType,
  EntityKey
}
