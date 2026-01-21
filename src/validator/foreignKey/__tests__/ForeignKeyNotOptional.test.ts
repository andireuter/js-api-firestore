import "reflect-metadata"

import {
  Collection,
} from "../../../decorator"
import { ForeignKeyNotOptionalValidator } from "../ForeignKeyNotOptional.validator"

@Collection({ name: "Entities" })
class Entity { }

describe("foreign key not optional validation", () => {
  test("undefined value", async () => {
    const validator = new ForeignKeyNotOptionalValidator()
    const validationResult = validator.validate({
      name: "foreignKey",
      value: undefined,
      options: { collection: Entity, optional: false }
    })

    expect(validationResult.isFailure).toBe(true)
    expect(validationResult.error?.name).toBe("ForeignKeyNotOptionalError")
  })

  test("undefined optional value", async () => {
    const validator = new ForeignKeyNotOptionalValidator()
    const validationResult = validator.validate({
      name: "foreignKey",
      value: undefined,
      options: { collection: Entity, optional: true }
    })

    expect(validationResult.isSuccess).toBe(true)
  })
})
