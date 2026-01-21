import {
  AttributeNotOptionalValidator,
  AttributeTypeValidator,
  AttributeValidationProps
} from "../attribute"

import { ValidationDecorator } from "../ValidationDecorator"

describe("validation decorator", () => {
  test("undefined value fails validation", async () => {
    const validationResult = new ValidationDecorator<AttributeValidationProps>()
      .add(new AttributeTypeValidator())
      .add(new AttributeNotOptionalValidator())
      .validate({
        name: "attribute",
        value: undefined,
        options: { type: "number", optional: false }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeNotOptionalError")
  })

  test("incorrect value type fails validation", async () => {
    const validationResult = new ValidationDecorator<AttributeValidationProps>()
      .add(new AttributeTypeValidator())
      .add(new AttributeNotOptionalValidator())
      .validate({
        name: "attribute",
        value: "1",
        options: { type: "number", optional: false }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("AttributeTypeError")
  })

  test("don't add validator", async () => {
    const validationResult = new ValidationDecorator<AttributeValidationProps>()
      .validate({
        name: "attribute",
        value: "1",
        options: { type: "number", optional: false }
      })

    expect(validationResult.isSuccess).toBe(true)
    expect(validationResult.isFailure).toBe(false)
    expect(validationResult.value).toBeUndefined()
    expect(validationResult.error).toBeUndefined()
  })
})
