import { AttributeTypeValidator } from "../../.."

describe("attribute type validation", () => {
  test("numeric value", async () => {
    const validator = new AttributeTypeValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: 1,
      options: { type: "number", optional: false }
    })

    expect(validationResult.isSuccess).toBe(true)
  })

  test("incorrect numeric value", async () => {
    const validator = new AttributeTypeValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: "1",
      options: { type: "number", optional: false }
    })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeTypeError")
  })

  test("string value", async () => {
    const validator = new AttributeTypeValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: "1",
      options: { type: "string", optional: false }
    })

    expect(validationResult.isSuccess).toBe(true)
  })

  test("incorrect string value", async () => {
    const validator = new AttributeTypeValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: 1,
      options: { type: "string", optional: false }
    })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeTypeError")
  })

  test("bool value", async () => {
    const validator = new AttributeTypeValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: true,
      options: { type: "bool", optional: false }
    })

    expect(validationResult.isSuccess).toBe(true)
  })

  test("incorrect bool value of type string", async () => {
    const validator = new AttributeTypeValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: "true",
      options: { type: "bool", optional: false }
    })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeTypeError")
  })

  test("incorrect bool value of type number", async () => {
    const validator = new AttributeTypeValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: 1,
      options: { type: "bool", optional: false }
    })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeTypeError")
  })

  test("object value", async () => {
    const validator = new AttributeTypeValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: {},
      options: { type: "object", optional: false }
    })

    expect(validationResult.isSuccess).toBe(true)
  })
})
