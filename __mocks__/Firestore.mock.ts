const get = jest.fn(() => ({
  exists: jest.fn().mockReturnValue(true),
  data: jest.fn().mockReturnValue({})
}))

const doc = jest.fn(() => ({
  get,
  set: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn().mockReturnValue(true)
}))

const add = jest.fn()

const mockCollection = jest.fn(() => ({
  doc,
  add
}))

const FirestoreMock = jest.fn(() => ({
  collection: mockCollection
}))

export { FirestoreMock, mockCollection }
