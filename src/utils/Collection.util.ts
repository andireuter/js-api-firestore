import { CollectionReference, Firestore } from "@google-cloud/firestore"

import { CollectionNotFoundError } from "../error"
import { CollectionOptions } from "../decorator"
import { DecoratorUtils } from "./Decorator.util"
import { Instantiable } from "@andireuter/js-domain-principles"

class CollectionUtils {
  static collection<T>(target: Instantiable<T>, firestore: Firestore): CollectionReference<T> | undefined {
    const collectionOptions = DecoratorUtils.getOptions<T, CollectionOptions>(target, "collection")

    if (collectionOptions) {
      const collection = firestore.collection(collectionOptions.name) as CollectionReference<T>

      if (!collection) {
        throw new CollectionNotFoundError(collectionOptions.name)
      }

      return (collection)
    }
  }
}

export { CollectionUtils }
