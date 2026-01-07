class ForeignKeyNotOptionalError extends Error {
  constructor(foreignKeyName: string) {
    super(`Cannot find this not optional foreign key "${foreignKeyName}”.`)
    this.name = "ForeignKeyNotOptionalError"
  }
}

export { ForeignKeyNotOptionalError }
