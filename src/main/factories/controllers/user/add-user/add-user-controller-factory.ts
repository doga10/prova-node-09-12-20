import { makeAddUserValidation } from './add-user-validation-factory'
import { Controller } from '../../../../../presentation/protocols'
import { AddUserController } from '../../../../../presentation/controllers/user/add-user/add-user-controller'
import { makeDbAddUser } from '../../../usecases/user/add-user/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeAddUserController = (): Controller => {
  const controller = new AddUserController(makeAddUserValidation(), makeDbAddUser())
  return makeLogControllerDecorator(controller)
}
