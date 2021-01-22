import { UserCollection } from '../../../../domain/collections/user'

export interface LoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<UserCollection>
}
