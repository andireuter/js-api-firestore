type AttributeObjectType = "array" | "map"

interface AttributeObjectOptions {
  /**
   * Type of the attribute object.
   */
  type: AttributeObjectType

  /**
   * Determines whether attribute object is optional.
   */
  optional: boolean
}

/**
 * Decorator that marks a class to be a attribute object.
 *
 * @param options Options for the attribute object.
 */
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
const AttributeObject = (options: AttributeObjectOptions): PropertyDecorator => (target: Object, propertyKey: string | symbol) => Reflect.defineMetadata("attributeObject", options, target, propertyKey)

export {
  type AttributeObjectOptions,
  type AttributeObjectType,
  AttributeObject
}
