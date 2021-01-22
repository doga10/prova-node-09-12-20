import { AddUserRepository } from '../protocols/db/user/add-user-repository'
import { LoadUserByEmailRepository } from '../protocols/db/user/load-user-by-email-repository'
import { AddUserParams } from '../../domain/usecases/user/add-user'
import { UserCollection } from '../../domain/collections/user'
import { mockUserModel } from '../../domain/test'
import { LoadUsersRepository } from 'data/protocols/db/user/load-users-repository'
import { SaveUserRepository } from 'data/protocols/db/user/save-user-repository'

export class AddUserRepositorySpy implements AddUserRepository {
  userModel = mockUserModel()
  addUserParams: AddUserParams

  async add (data: AddUserParams): Promise<UserCollection> {
    this.addUserParams = data
    return this.userModel
  }
}

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  userModel = mockUserModel()
  email: string

  async loadByEmail (email: string): Promise<UserCollection> {
    this.email = email
    return this.userModel
  }
}

export class LoadUsersRepositorySpy implements LoadUsersRepository {
  userModel = [mockUserModel()]

  async load (): Promise<UserCollection[]> {
    return this.userModel
  }
}

export class SaveUserRepositorySpy implements SaveUserRepository {
  userModel = mockUserModel()
  data: UserCollection

  async save (data: UserCollection): Promise<UserCollection> {
    this.data = data
    return this.userModel
  }
}
