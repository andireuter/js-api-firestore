import { AttributeValidationDecorator } from "../AttributeValidation.decorator"

describe("attribute validation", () => {
  test("valid", async () => {
    const validationResult = new AttributeValidationDecorator()
      .validate({
        name: "attribute",
        value: 1,
        options: { type: "number", optional: false }
      })

    expect(validationResult.isSuccess).toBe(true)
  })

  test("incorrect type", async () => {
    const validationResult = new AttributeValidationDecorator()
      .validate({
        name: "attribute",
        value: false,
        options: { type: "number", optional: false }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeTypeError")
  })

  test("undefined value", async () => {
    const validationResult = new AttributeValidationDecorator()
      .validate({
        name: "attribute",
        value: undefined,
        options: { type: "bool", optional: false }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeNotOptionalError")
  })
})
