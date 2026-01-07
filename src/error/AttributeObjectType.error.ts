class AttributeObjectTypeError extends Error {
  constructor(attributeObjectName: string, attributeObjectType: string) {
    super(`Value of attribute object "${attributeObjectName}” is of wrong type "${attributeObjectType}".`)
    this.name = "AttributeObjectTypeError"
  }
}

export { AttributeObjectTypeError }
