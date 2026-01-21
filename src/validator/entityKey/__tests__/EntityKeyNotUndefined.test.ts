import "reflect-metadata"

import { EntityKeyValidationDecorator } from "../EntityKeyValidation.decorator"

describe("entity key undefined validation", () => {
  test("undefined numeric value", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: undefined,
        options: { type: "number" }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("EntityKeyNotUndefinedError")
  })

  test("undefined string value", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: undefined,
        options: { type: "string" }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("EntityKeyNotUndefinedError")
  })
})
