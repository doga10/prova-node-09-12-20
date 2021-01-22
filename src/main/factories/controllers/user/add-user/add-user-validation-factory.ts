import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'

export const makeAddUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'name', 'username']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
