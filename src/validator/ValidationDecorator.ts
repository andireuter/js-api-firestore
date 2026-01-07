import { IValidator, Result } from "@andireuter/js-domain-principles"

import { IValidationDecorator } from "./IValidationDecorator"

class ValidationDecorator<T> implements IValidationDecorator<T> {
  private readonly validators: IValidator<T>[]

  constructor() {
    this.validators = []
  }

  add(validator: IValidator<T>): this {
    this.validators.push(validator)
    return (this)
  }

  validate(value: T): Result<T> {
    try {
      this.validators.forEach(validator => {
        const validationResult = validator.validate(value) as Result<T>

        if (validationResult.isFailure) {
          throw validationResult.error
        }
      })

      return (Result.ok<T>())
    } catch (error: unknown) {
      return (Result.fail<T>(error as Error))
    }
  }
}

export { ValidationDecorator }
