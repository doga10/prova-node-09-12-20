import { adaptRoute } from '../adapters/node-route-adapter'
import { makeAddUserController } from '../factories/controllers/user/add-user/add-user-controller-factory'
import { makeLoadUsersController } from '../factories/controllers/user/load-users/load-users-controller-factory'
import { makeSaveUserController } from '../factories/controllers/user/save-user/save-user-controller-factory'
import { makeRemoveUserController } from '../factories/controllers/user/remove-user/remove-user-controller-factory'

export default (router): void => {
  router.get('/users', adaptRoute(makeLoadUsersController()))
  router.post('/users', adaptRoute(makeAddUserController()))
  router.put('/users', adaptRoute(makeSaveUserController()))
  router.delete('/users/:id', adaptRoute(makeRemoveUserController()))
}
