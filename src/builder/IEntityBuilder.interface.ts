interface IEntityBuilder<T> {
  build(): T | Promise<T>
}

export type { IEntityBuilder }
