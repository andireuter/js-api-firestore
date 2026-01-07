class EntityKeyNotFoundError extends Error {
  constructor() {
    super("Could not find a \"EntityKey\" decorator.")
    this.name = "EntityKeyNotFoundError"
  }
}

export { EntityKeyNotFoundError }
