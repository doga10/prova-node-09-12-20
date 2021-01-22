import { UserCollection } from '../../collections/user'

export interface LoadUsers {
  load: () => Promise<UserCollection[]>
}
