import {
  Attribute,
  Collection,
  EntityKey
} from "../src"

@Collection({ name: "RankingLists" })
class RankingListMock {
  @EntityKey({ type: "string" })
  id: string

  @Attribute({
    type: "number",
    optional: false
  })
  scores: number[]
}

export { RankingListMock }
