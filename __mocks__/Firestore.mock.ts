const mockGet = jest.fn(() => ({
  exists: jest.fn().mockReturnValue(true),
  data: jest.fn().mockReturnValue({})
}))

const mockDoc = jest.fn(() => ({
  mockGet: mockGet,
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
