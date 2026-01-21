import "reflect-metadata"

import { Collection } from "../../../decorator"
import { ForeignKeyValidationDecorator } from "../ForeignKeyValidation.decorator"

@Collection({ name: "Entities" })
class Entity { }

describe("foreign key validation", () => {
  test("valid", async () => {
    const validationResult = new ForeignKeyValidationDecorator()
      .validate({
        name: "foreignKey",
        value: ["1", "2"],
        options: { collection: Entity, optional: false }
      })

    expect(validationResult.isSuccess).toBe(true)
  })

  test("undefined value", async () => {
    const validationResult = new ForeignKeyValidationDecorator()
      .validate({
        name: "foreignKey",
        value: undefined,
        options: { collection: Entity, optional: false }
      })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("ForeignKeyNotOptionalError")
  })
})
