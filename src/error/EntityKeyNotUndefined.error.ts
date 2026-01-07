class EntityKeyNotUndefinedError extends Error {
  constructor(EntityKeyName: string) {
    super(`Value of entity key "${EntityKeyName}” is undefined or null.`)
    this.name = "EntityKeyNotUndefinedError"
  }
}

export { EntityKeyNotUndefinedError }
