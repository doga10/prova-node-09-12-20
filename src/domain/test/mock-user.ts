import { AddUserParams } from '../usecases/user/add-user'
import { UserCollection } from '../collections/user'
import faker from 'faker'

export const mockAddUserParams = (): AddUserParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  username: faker.name.findName(),
})

export const mockAccountModel = (): UserCollection => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  username: faker.name.findName(),
})