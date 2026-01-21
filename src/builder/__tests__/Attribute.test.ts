import "reflect-metadata"

import { Attribute } from "../../decorator"
import { AttributeBuilder } from "../Attribute.builder"

describe("attribute builder", () => {
  test("attribute with validation", async () => {
    class Entity {
      @Attribute({
        type: "number",
        optional: false
      })
      attribute: number = 0
    }

    const targetProps = new Entity()
    targetProps.attribute = 11
    const attributeBuilder = new AttributeBuilder<Entity>(Entity)

    attributeBuilder.addAttribute(
      "attribute",
      targetProps["attribute" as keyof Entity]
    )

    const builderResult = attributeBuilder.build()

    expect(builderResult).toEqual({ attribute: 11 })
  })

  test("attribute with undefined value", async () => {
    class Entity {
      @Attribute({
        type: "number",
        optional: true,
      })
      attribute?: number | undefined = undefined
    }

    const targetProps = new Entity()
    const attributeBuilder = new AttributeBuilder<Entity>(Entity)

    attributeBuilder.addAttribute(
      "attribute",
      targetProps["attribute" as keyof Entity]
    )

    const builderResult = attributeBuilder.build()

    expect(builderResult).toEqual({ attribute: undefined })
  })

  test("incorrect attribute without value", async () => {
    class Entity {
      @Attribute({
        type: "number",
        optional: false,
      })
      attribute: number
    }

    const targetProps = new Entity()
    const attributeBuilder = new AttributeBuilder<Entity>(Entity)

    attributeBuilder.addAttribute(
      "attribute",
      targetProps["attribute" as keyof Entity]
    )

    const builderResult = attributeBuilder.build()

    expect(builderResult).toEqual({ attribute: undefined })
  })
})
