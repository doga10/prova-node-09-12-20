import { UserCollection } from '../../collections/user'

export type AddUserParams = Omit<UserCollection, 'id'>

export interface AddUser {
  add: (user: AddUserParams) => Promise<UserCollection>
}