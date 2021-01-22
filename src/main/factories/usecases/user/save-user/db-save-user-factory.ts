import { SaveUser } from '../../../../../domain/usecases/user/save-user'
import { DbSaveUser } from '../../../../../data/usecases/user/save-user/db-save-user'
import { UserMongoRepository } from '../../../../../infra/db/mongodb/user/user-mongo-repository'

export const makeDbSaveUser = (): SaveUser => {
  const userMongoRepository = new UserMongoRepository()
  return new DbSaveUser(userMongoRepository)
}
