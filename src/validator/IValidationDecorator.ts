import { IValidator, Result } from "@andireuter/js-domain-principles"

interface IValidationDecorator<T> {
  add(validator: IValidator<T>): this
  validate(value: T): Result<T>
}

export type { IValidationDecorator }
