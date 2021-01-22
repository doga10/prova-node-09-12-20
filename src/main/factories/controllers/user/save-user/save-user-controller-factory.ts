import { makeSaveUserValidation } from './save-user-validation-factory'
import { Controller } from '../../../../../presentation/protocols'
import { SaveUserController } from '../../../../../presentation/controllers/user/save-user/save-user-controller'
import { makeDbSaveUser } from '../../../usecases/user/save-user/db-save-user-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeSaveUserController = (): Controller => {
  const controller = new SaveUserController(makeSaveUserValidation(), makeDbSaveUser())
  return makeLogControllerDecorator(controller)
}
