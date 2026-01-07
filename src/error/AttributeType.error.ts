class AttributeTypeError extends Error {
  constructor(attributeName: string, attributeType: string) {
    super(`Value of attribute "${attributeName}” is of wrong type "${attributeType}".`)
    this.name = "AttributeTypeError"
  }
}

export { AttributeTypeError }
