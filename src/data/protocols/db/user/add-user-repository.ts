import { AddUserParams } from '../../../../domain/usecases/user/add-user'
import { UserCollection } from '../../../../domain/collections/user'

export interface AddUserRepository {
  add: (data: AddUserParams) => Promise<UserCollection>
}
