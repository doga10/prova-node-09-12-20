import { RemoveUser } from '../../../../../domain/usecases/user/remove-user'
import { DbRemoveUser } from '../../../../../data/usecases/user/remove-user/db-remove-user'
import { UserMongoRepository } from '../../../../../infra/db/mongodb/user/user-mongo-repository'

export const makeDbRemoveUser = (): RemoveUser => {
  const userMongoRepository = new UserMongoRepository()
  return new DbRemoveUser(userMongoRepository)
}
