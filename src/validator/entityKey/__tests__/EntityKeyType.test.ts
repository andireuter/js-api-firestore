import "reflect-metadata"

import { EntityKeyValidationDecorator } from "../EntityKeyValidation.decorator"

describe("entity key type validation", () => {
  test("string value", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: "1",
        options: { type: "string" }
      })

    expect(validationResult.isSuccess).toBe(true)
  })

  test("incorrect numeric value", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: 1,
        options: { type: "string" }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("EntityKeyTypeError")
  })

  test("incorrect numeric list of values", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: [1, 2],
        options: { type: "string" }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("EntityKeyTypeError")
  })
})
