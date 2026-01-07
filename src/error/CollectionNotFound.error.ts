class CollectionNotFoundError extends Error {
  constructor(collectionName: string) {
    super(`Cannot find this unknown collection "${collectionName}”.`)
    this.name = "CollectionNotFoundError"
  }
}

export { CollectionNotFoundError }
