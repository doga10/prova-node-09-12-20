import { SaveUser, UserCollection, SaveUserRepository } from './db-save-user-protocols'

export class DbSaveUser implements SaveUser {
  constructor (
    private readonly saveUserRepository: SaveUserRepository
  ) {}

  async save (userData: UserCollection): Promise<any> {
    const newUser = await this.saveUserRepository.save(userData)
    return newUser
  }
}
