import { UserCollection } from '../../../../domain/collections/user'

export interface SaveUserRepository {
  save: (data: UserCollection) => Promise<any>
}
