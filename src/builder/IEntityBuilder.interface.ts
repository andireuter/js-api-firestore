interface IEntityBuilder<T> {
  build(): T | Promise<T>
}

export { IEntityBuilder }
