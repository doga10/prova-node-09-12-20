import { AddUser } from '../../../../../domain/usecases/user/add-user'
import { DbAddUser } from '../../../../../data/usecases/user/add-user/db-add-user'
import { UserMongoRepository } from '../../../../../infra/db/mongodb/user/user-mongo-repository'

export const makeDbAddUser = (): AddUser => {
  const userMongoRepository = new UserMongoRepository()
  return new DbAddUser(userMongoRepository, userMongoRepository)
}
