import { EntityDirector } from "./builder"
import { Filter } from "@google-cloud/firestore"
import { FirestoreRepository } from "./persistence"
import { Instantiable } from "@andireuter/js-domain-principles"

class Firestore<T extends Partial<unknown>> {
  private readonly firestoreRepository: FirestoreRepository
  private readonly target: Instantiable<T>

  constructor(target: Instantiable<T>) {
    this.firestoreRepository = new FirestoreRepository()
    this.target = target
  }

  async insert(targetProps: T): Promise<T | undefined> {
    const targetResult = await new EntityDirector<T>(this.target, targetProps)
      .construct()

    if (targetResult.isFailure) {
      return (Promise.reject(targetResult.error))
    }

    const newTarget = await this.firestoreRepository.insert(this.target, targetResult.value)

    if (newTarget) {
      const entityResult = await new EntityDirector<T>(this.target, newTarget)
        .construct()

      if (entityResult.isFailure) {
        return (Promise.reject(entityResult.error))
      }

      return (Promise.resolve(entityResult.value))
    }
  }

  async changeById(targetProps: T): Promise<T | undefined> {
    const testResult = await new EntityDirector<T>(this.target, targetProps)
      .test()

    if (testResult.isFailure) {
      return (Promise.reject(testResult.error))
    }

    const newTarget = await this.firestoreRepository.changeById<T>(this.target, targetProps)

    if (newTarget) {
      const entityResult = await new EntityDirector<T>(this.target, newTarget)
        .construct()

      if (entityResult.isFailure) {
        return (Promise.reject(entityResult.error))
      }

      return (Promise.resolve(entityResult.value))
    }
  }

  async findById(id: string): Promise<T | undefined> {
    const targetProps = await this.firestoreRepository.findById<T>(this.target, id)

    if (targetProps) {
      const entityResult = await new EntityDirector<T>(this.target, targetProps)
        .construct()

      if (entityResult.isFailure) {
        return (Promise.reject(entityResult.error))
      }

      return (Promise.resolve(entityResult.value))
    }
  }

  async find(filter: Filter): Promise<T[] | undefined> {
    const targetProps = await this.firestoreRepository.find<T>(this.target, filter)

    if (targetProps) {
      const entities: T[] = []

      await Promise.all(targetProps.map(async targetProps => {
        const entityResult = await new EntityDirector<T>(this.target, targetProps)
          .construct()

        if (entityResult.isFailure) {
          return (Promise.reject(entityResult.error))
        }

        entities.push(entityResult.value as T)
      }))

      return (Promise.resolve(entities))
    }
  }

  async fetch(): Promise<T[] | undefined> {
    const targetProps = await this.firestoreRepository.fetch(this.target)

    if (targetProps) {
      const entities: T[] = []

      await Promise.all(targetProps.map(async targetProps => {
        const entityResult = await new EntityDirector<T>(this.target, targetProps)
          .construct()

        if (entityResult.isFailure) {
          return (Promise.reject(entityResult.error))
        }

        entities.push(entityResult.value as T)
      }))

      return (Promise.resolve(entities))
    }
  }

  async deleteById(id: string): Promise<void> {
    await this.firestoreRepository.deleteById(this.target, id)
  }
}

export { Firestore }
