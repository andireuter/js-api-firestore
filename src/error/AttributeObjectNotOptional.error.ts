class AttributeObjectNotOptionalError extends Error {
  constructor(attributeObjectName: string) {
    super(`Cannot find this not optional attribute object "${attributeObjectName}”.`)
    this.name = "AttributeObjectNotOptionalError"
  }
}

export { AttributeObjectNotOptionalError }
