import "reflect-metadata"

import { Attribute, EntityKey } from "../../decorator"

import { DecoratorUtils } from "../Decorator.util"

class Entity {
  @EntityKey({ type: "number" })
  id: number = 0

  @Attribute({
    type: "number",
    optional: false
  })
  attribute: number = 0
}

describe("decorator utils", () => {
  test("find all property keys", async () => {
    const attributeKey = DecoratorUtils.getPropertyKeys<Entity>(Entity, "attribute")
      ?.find(attributeKey => attributeKey === "attribute")

    expect(attributeKey).toBe("attribute")
  })

  test("find single property key", async () => {
    const entityKey = DecoratorUtils.getPropertyKey(Entity, "entityKey")

    expect(entityKey).toBe("id")
  })
})
