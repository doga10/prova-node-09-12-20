import { UserMongoRepository } from './user-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { mockAddUserParams } from '../../../../domain/test'
import { Collection } from 'mongodb'
import faker from 'faker'

let userCollection: Collection

describe('UserMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  const makeSut = (): UserMongoRepository => {
    return new UserMongoRepository()
  }

  describe('add()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      const user = await sut.add(addUserParams)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe(addUserParams.name)
      expect(user.email).toBe(addUserParams.email)
      expect(user.username).toBe(addUserParams.username)
    })
  })

  describe('remove()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      const user = await sut.add(addUserParams)
      const remove = await sut.remove(user.id)
      expect(remove).toBeFalsy()
    })
  })

  describe('load()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await sut.add(addUserParams)
      const user = await sut.load()
      expect(user).toBeTruthy()
      expect(user.length).toBe(1)
    })

    test('Should return an user empty', async () => {
      const sut = makeSut()
      const user = await sut.load()
      expect(user.length).toBe(0)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const user = await sut.loadByEmail(addUserParams.email)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe(addUserParams.name)
      expect(user.email).toBe(addUserParams.email)
      expect(user.username).toBe(addUserParams.username)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const user = await sut.loadByEmail(faker.internet.email())
      expect(user).toBeFalsy()
    })
  })

  describe('save()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      const user = await sut.add(addUserParams)
      const save = await sut.save(user)
      expect(save).toBeTruthy()
    })
  })
})
