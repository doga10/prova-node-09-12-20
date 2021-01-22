import { Controller } from '../../../../../presentation/protocols'
import { RemoveUserController } from '../../../../../presentation/controllers/user/remove-user/remove-user-controller'
import { makeDbRemoveUser } from '../../../usecases/user/remove-user/db-remove-user-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeRemoveUserController = (): Controller => {
  const controller = new RemoveUserController(makeDbRemoveUser())
  return makeLogControllerDecorator(controller)
}
