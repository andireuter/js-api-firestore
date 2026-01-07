class AttributeNotOptionalError extends Error {
  constructor(attributeName: string) {
    super(`Cannot find this not optional attribute "${attributeName}”.`)
    this.name = "AttributeNotOptionalError"
  }
}

export { AttributeNotOptionalError }
