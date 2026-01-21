const mockGet = jest.fn(() => ({
  data: jest.fn().mockReturnValue({
    "attribute": 11,
    "childs": [{
      "attribute": "child 1",
    }],
    "id": "1"
  }),
  id: "1",
  exists: jest.fn().mockReturnValue(true)
}))

const mockDoc = jest.fn(() => ({
  get: mockGet,
  set: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn().mockReturnValue(true)
}))

const mockBatch = jest.fn(() => ({
  set: jest.fn(),
  commit: jest.fn()
}))

const mockCollection = jest.fn(() => ({
  doc: mockDoc,
  add: jest.fn()
}))

const FirestoreMock = jest.fn(() => ({
  batch: mockBatch,
  collection: mockCollection
}))

export { FirestoreMock, mockCollection }
