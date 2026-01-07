// eslint-disable-next-line jest/no-mocks-import
import {
  FirestoreMock,
  RankingListMock,
  mockCollection
} from "../__mocks__"

import { Firestore } from "../src"

jest.mock("@google-cloud/firestore", () => ({
  Firestore: jest.fn().mockImplementation(() => FirestoreMock())
}))

afterEach(() => {
  jest.clearAllMocks()
})

const rankingList = new RankingListMock()
rankingList.id = "1"
rankingList.scores = [28]

const context = new Firestore<RankingListMock>(RankingListMock)

test("inserts new entity", async () => {
  await context.insert(rankingList)

  expect(mockCollection).toHaveBeenCalledTimes(1)
})

test("changes entity by id", async () => {
  await context.changeById(rankingList)

  expect(mockCollection).toHaveBeenCalledTimes(1)
})
