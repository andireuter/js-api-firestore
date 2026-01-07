import { Instantiable } from "@andireuter/js-domain-principles"

interface ForeignKeyOptions {
  /**
   * Type of the foreign collection.
   */
  collection: Instantiable<unknown>

  /**
   * Determines whether foreign key is optional.
   */
  optional: boolean
}

/**
 * Decorator that marks a property to be a foreign key.
 *
 * @param options Options for the foreign key.
 */
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
const ForeignKey = (options: ForeignKeyOptions): PropertyDecorator => (target: Object, propertyKey: string | symbol) => Reflect.defineMetadata("foreignKey", options, target, propertyKey)

export { type ForeignKeyOptions, ForeignKey }
