import { UserCollection } from '../../collections/user'

export interface SaveUser {
  save: (user: UserCollection) => Promise<UserCollection>
}
