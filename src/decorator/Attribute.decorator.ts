import { Instantiable } from "@andireuter/js-domain-principles"

type AttributeType = "string" | "number" | "bool" | "object"

interface AttributeOptions {
  /**
   * Type of the attribute.
   */
  type: AttributeType

  /**
   * Type of the object if attribute type is "object".
   */
  object?: Instantiable<unknown>

  /**
   * Determines whether attribute is optional.
   */
  optional: boolean
}

/**
 * Decorator that marks a property to be an attribute.
 *
 * @param options Options for the attribute.
 */
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
const Attribute = (options: AttributeOptions): PropertyDecorator => (target: Object, propertyKey: string | symbol) => Reflect.defineMetadata("attribute", options, target, propertyKey)

export {
  type AttributeOptions,
  type AttributeType,
  Attribute
}
