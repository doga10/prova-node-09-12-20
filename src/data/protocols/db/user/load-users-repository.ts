import { UserCollection } from '../../../../domain/collections/user'

export interface LoadUsersRepository {
  load: () => Promise<UserCollection[]>
}
