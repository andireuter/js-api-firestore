import "reflect-metadata"

import { EntityKeyValidationDecorator } from "../EntityKeyValidation.decorator"

describe("entity key validation", () => {
  test("number type", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: 1,
        options: { type: "number" }
      })

    expect(validationResult.isSuccess).toBe(true)
  })

  test("incorrect number type", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: "1",
        options: { type: "number" }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("EntityKeyTypeError")
  })

  test("undefined value", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: undefined,
        options: { type: "number" }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("EntityKeyNotUndefinedError")
  })

  test("string type", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: "1",
        options: { type: "string" }
      })

    expect(validationResult.isSuccess).toBe(true)
  })

  test("incorrect string type", async () => {
    const validationResult = new EntityKeyValidationDecorator()
      .validate({
        name: "entityKey",
        value: 1,
        options: { type: "string" }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("EntityKeyTypeError")
  })
})
