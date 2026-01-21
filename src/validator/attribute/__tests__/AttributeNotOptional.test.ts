import { AttributeNotOptionalValidator } from "../AttributeNotOptional.validator"

describe("attribute not optional validation", () => {
  test("undefined value", async () => {
    const validator = new AttributeNotOptionalValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: undefined,
      options: { type: "number", optional: false }
    })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeNotOptionalError")
  })

  test("undefined optional value", async () => {
    const validator = new AttributeNotOptionalValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: undefined,
      options: { type: "number", optional: true }
    })

    expect(validationResult.isSuccess).toBe(true)
  })

  test("undefined object value", async () => {
    const validator = new AttributeNotOptionalValidator()
    const validationResult = validator.validate({
      name: "attribute",
      value: undefined,
      options: { type: "object", optional: false }
    })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeNotOptionalError")
  })
})
