import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AddUserParams } from '../../../../domain/usecases/user/add-user'
import { UserCollection } from '../../../../domain/collections/user'
import { AddUserRepository } from '../../../../data/protocols/db/user/add-user-repository'
import { LoadUserByEmailRepository } from '../../../../data/protocols/db/user/load-user-by-email-repository'
import { SaveUserRepository } from '../../../../data/protocols/db/user/save-user-repository'
import { LoadUsersRepository } from '../../../../data/protocols/db/user/load-users-repository'
import { RemoveUserRepository } from 'data/protocols/db/user/remove-user-repository'

export class UserMongoRepository implements AddUserRepository, LoadUserByEmailRepository, SaveUserRepository, LoadUsersRepository, RemoveUserRepository {
  async load (): Promise<UserCollection[]> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.find({}).toArray()
    return MongoHelper.mapCollection(result)
  }

  async add (data: AddUserParams): Promise<UserCollection> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(data)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<UserCollection> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email })
    return user && MongoHelper.map(user)
  }

  async save (data: UserCollection): Promise<any> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.updateOne({ email: data.email }, { $set: data })
    return user
  }

  async remove (id: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteOne({ _id: new ObjectId(id) })
  }
}
