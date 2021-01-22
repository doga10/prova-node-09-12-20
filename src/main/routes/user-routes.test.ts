import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'

let userCollection: Collection

describe('User Routes', () => {
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

  describe('POST /v1/users', () => {
    test('Should return 200 on user', async () => {
      await request(app)
        .post('/v1/users')
        .send({
          name: 'Douglas Dennys',
          email: 'douglasdennys45@gmail.com',
          username: 'douglas_dennys'
        })
        .expect(200)
      await request(app)
        .post('/v1/users')
        .send({
          name: 'Douglas Dennys',
          email: 'douglasdennys45@gmail.com',
          username: 'douglas_dennys'
        })
        .expect(204)
    })
  })

  describe('GET /v1/users', () => {
    test('Should return 200 on users', async () => {
      await userCollection.insertOne({
        name: 'Douglas Dennys',
        email: 'douglasdennys45@gmail.com',
        username: 'douglas_dennys'
      })
      await request(app)
        .get('/v1/users')
        .expect(200)
    })

    test('Should return 204 on users', async () => {
      await request(app)
        .get('/v1/users')
        .expect(204)
    })
  })

  describe('DELETE /v1/users/:id', () => {
    test('Should return 204 on user', async () => {
      const user = await userCollection.insertOne({
        name: 'Douglas Dennys',
        email: 'douglasdennys45@gmail.com',
        username: 'douglas_dennys'
      })
      await request(app)
        .delete(`/v1/users/${user.ops[0]._id}`)
        .expect(204)
    })
  })

  describe('PUT /v1/users', () => {
    test('Should return 200 on user', async () => {
      await userCollection.insertOne({
        name: 'Douglas Dennys',
        email: 'douglasdennys45@gmail.com',
        username: 'douglas_dennys'
      })
      await request(app)
        .put('/v1/users')
        .send({
          name: 'Douglas Dennys2',
          email: 'douglasdennys45@gmail.com',
          username: 'douglas_dennys'
        })
        .expect(200)
    })
  })
})
