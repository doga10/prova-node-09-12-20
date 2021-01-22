import { LoadUsers } from '../../../../../domain/usecases/user/load-users'
import { DbLoadUsers } from '../../../../../data/usecases/user/load-users/db-load-users'
import { UserMongoRepository } from '../../../../../infra/db/mongodb/user/user-mongo-repository'

export const makeDbLoadUsers = (): LoadUsers => {
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUsers(userMongoRepository)
}
