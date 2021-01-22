import { DbAddUser } from './db-add-user'
import { AddUserRepositorySpy, LoadUserByEmailRepositorySpy } from '../../../test'
import { mockUserModel, mockAddUserParams, throwError } from '../../../../domain/test'

type SutTypes = {
  sut: DbAddUser
  addUserRepositorySpy: AddUserRepositorySpy
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.userModel = null
  const addUserRepositorySpy = new AddUserRepositorySpy()
  const sut = new DbAddUser(addUserRepositorySpy, loadUserByEmailRepositorySpy)
  return {
    sut,
    addUserRepositorySpy,
    loadUserByEmailRepositorySpy
  }
}

describe('DbAddUser Usecase', () => {
  test('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositorySpy } = makeSut()
    const addUserParams = mockAddUserParams()
    await sut.add(addUserParams)
    expect(addUserRepositorySpy.addUserParams).toEqual({
      name: addUserParams.name,
      email: addUserParams.email,
      username: addUserParams.username
    })
  })

  test('Should throw if AddUserRepository throws', async () => {
    const { sut, addUserRepositorySpy } = makeSut()
    jest.spyOn(addUserRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user on success', async () => {
    const { sut, addUserRepositorySpy } = makeSut()
    const user = await sut.add(mockAddUserParams())
    expect(user).toEqual(addUserRepositorySpy.userModel)
  })

  test('Should return null if LoadUserByEmailRepository not return null', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.userModel = mockUserModel()
    const user = await sut.add(mockAddUserParams())
    expect(user).toBeNull()
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    const addUserParams = mockAddUserParams()
    await sut.add(addUserParams)
    expect(loadUserByEmailRepositorySpy.email).toBe(addUserParams.email)
  })
})
