class EntityKeyTypeError extends Error {
  constructor(entityKeyName: string, entityKeyType: string) {
    super(`Value of entity key "${entityKeyName}” is of wrong type "${entityKeyType}".`)
    this.name = "EntityKeyTypeError"
  }
}

export { EntityKeyTypeError }
