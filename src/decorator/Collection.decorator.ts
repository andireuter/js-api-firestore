interface CollectionOptions {
  /**
   * Name of the collection.
   */
  name: string
}

/**
 * Decorator that marks a class to be a collection.
 *
 * @param options Options for the collection.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const Collection = (options: CollectionOptions): ClassDecorator => (target: Function) => Reflect.defineMetadata("collection", options, target.prototype)

export { type CollectionOptions, Collection }
