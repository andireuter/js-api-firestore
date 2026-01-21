import "reflect-metadata"

import {
  Attribute,
  Collection,
  EntityKey
} from "../decorator"
// eslint-disable-next-line jest/no-mocks-import
import { FirestoreMock, mockCollection } from "../../__mocks__"

import { Firestore } from "../Firestore.facade"

jest.mock("@google-cloud/firestore", () => ({
  Firestore: jest.fn().mockImplementation(() => FirestoreMock())
}))

afterEach(() => {
  jest.clearAllMocks()
})

class ChildEntity {
  attribute: string
}

@Collection({ name: "Entities" })
class Entity {
  @EntityKey({ type: "string" })
  id: string = "0"

  @Attribute({
    type: "number",
    optional: false
  })
  attribute: number = 0

  @Attribute({
    type: "object",
    object: ChildEntity,
    optional: true
  })
  childs?: ChildEntity[] | undefined = undefined
}

const context = new Firestore<Entity>(Entity)

describe("attribute builder", () => {
  test("inserts new entity", async () => {
    const entity = new Entity()
    entity.id = "1"
    entity.attribute = 11
    entity.childs = [{
      attribute: "child 1"
    }]

    await context.insert(entity)

    const docMock = mockCollection.mock.results[0]?.value?.doc
    const docInstance = docMock?.mock.results[0]?.value

    expect(mockCollection).toHaveBeenCalledWith("Entities")
    expect(docInstance?.set).toHaveBeenCalledWith({
      "attribute": 11,
      "childs": [{
        "attribute": "child 1",
      }],
    })
  })

  test("changes entity by id", async () => {
    const entity = new Entity()
    entity.id = "1"
    entity.attribute = 0
    entity.childs = [{
      attribute: "child 2"
    }]

    await context.changeById(entity)

    const docMock = mockCollection.mock.results[0]?.value?.doc
    const docInstance = docMock?.mock.results[0]?.value

    expect(mockCollection).toHaveBeenCalledWith("Entities")
    expect(docInstance?.set).toHaveBeenCalledWith({
      "attribute": 0,
      "childs": [{
        "attribute": "child 2",
      }],
    }, { merge: true })
  })

  test("find entity by id", async () => {
    const result = await context.findById("1")

    const docMock = mockCollection.mock.results[0]?.value?.doc
    const docInstance = docMock?.mock.results[0]?.value

    expect(mockCollection).toHaveBeenCalledWith("Entities")
    expect(docInstance?.get).toHaveBeenCalledTimes(1)
    expect(result).toEqual({
      "attribute": 11,
      "childs": [{
        "attribute": "child 1",
      }],
      "id": "1",
    })
  })
})
