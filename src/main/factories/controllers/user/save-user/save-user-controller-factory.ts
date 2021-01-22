import { makeSaveUserValidation } from './save-user-validation-factory'
import { Controller } from '../../../../../presentation/protocols'
import { SaveUserController } from '../../../../../presentation/controllers/user/save-user/save-user-controller'
import { makeDbSaveUser } from '../../../usecases/user/save-user/db-save-user-factory'

export const makeSaveUserController = (): Controller => {
  const controller = new SaveUserController(makeSaveUserValidation(), makeDbSaveUser())
  return controller
}
