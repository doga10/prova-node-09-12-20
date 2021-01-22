import { LoadUsersRepository, LoadUsers, UserCollection } from './db-load-users-protocols'

export class DbLoadUsers implements LoadUsers {
  constructor (
    private readonly loadUsersRepository: LoadUsersRepository
  ) {}

  async load (): Promise<UserCollection[]> {
    const account = await this.loadUsersRepository.load()
    if (account) {
      return account
    }
    return null
  }
}
