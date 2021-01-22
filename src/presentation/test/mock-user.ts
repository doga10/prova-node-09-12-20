import { AddUser, AddUserParams } from '../../domain/usecases/user/add-user'
import { UserCollection } from '../../domain/collections/user'
import { mockUserModel } from '../../domain/test'
import { LoadUsers } from '../../domain/usecases/user/load-users'

export class AddUserSpy implements AddUser {
  userModel = mockUserModel()
  addUserParams: AddUserParams

  async add (data: AddUserParams): Promise<UserCollection> {
    this.addUserParams = data
    return this.userModel
  }
}

export class LoadUsersSpy implements LoadUsers {
  userModel = [mockUserModel()]

  async load (): Promise<UserCollection[]> {
    return this.userModel
  }
}
