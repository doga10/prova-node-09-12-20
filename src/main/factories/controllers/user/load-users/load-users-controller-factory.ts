import { Controller } from '../../../../../presentation/protocols'
import { LoadUsersController } from '../../../../../presentation/controllers/user/load-users/load-users-controller'
import { makeDbLoadUsers } from '../../../usecases/user/load-users/db-load-users-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoadUsersController = (): Controller => {
  const controller = new LoadUsersController(makeDbLoadUsers())
  return makeLogControllerDecorator(controller)
}
