import { AddUser, AddUserParams } from '../../domain/usecases/user/add-user'
import { UserCollection } from '../../domain/collections/user'
import { mockUserModel } from '../../domain/test'
import { LoadUsers } from '../../domain/usecases/user/load-users'
import { SaveUser } from 'domain/usecases/user/save-user'
import { RemoveUser } from 'domain/usecases/user/remove-user'

export class AddUserSpy implements AddUser {
  userModel = mockUserModel()
  addUserParams: AddUserParams

  async add (data: AddUserParams): Promise<UserCollection> {
    this.addUserParams = data
    return this.userModel
  }
}

export class SaveUserSpy implements SaveUser {
  userModel = mockUserModel()

  async save (data: UserCollection): Promise<UserCollection> {
    return this.userModel
  }
}

export class RemoveUserSpy implements RemoveUser {
  id: string

  async remove (id: string): Promise<void> {
    this.id = id
  }
}

export class LoadUsersSpy implements LoadUsers {
  userModel = [mockUserModel()]

  async load (): Promise<UserCollection[]> {
    return this.userModel
  }
}
