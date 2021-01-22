import { RemoveUser, RemoveUserRepository } from './db-remove-user-protocols'

export class DbRemoveUser implements RemoveUser {
  constructor (
    private readonly removeUserRepository: RemoveUserRepository
  ) {}

  async remove (id: string): Promise<void> {
    await this.removeUserRepository.remove(id)
  }
}
