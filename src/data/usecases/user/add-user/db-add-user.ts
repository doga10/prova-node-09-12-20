import { AddUser, AddUserParams, UserCollection, AddUserRepository, LoadUserByEmailRepository } from './db-add-user-protocols'

export class DbAddUser implements AddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}

  async add (userData: AddUserParams): Promise<UserCollection> {
    const user = await this.loadUserByEmailRepository.loadByEmail(userData.email)
    if (!user) {
      const newUser = await this.addUserRepository.add(userData)
      return newUser
    }
    return null
  }
}
