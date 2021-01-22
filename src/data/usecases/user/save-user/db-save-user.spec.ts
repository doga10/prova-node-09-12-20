import { DbSaveUser } from './db-save-user'
import { SaveUserRepositorySpy } from '../../../test'
import { mockUserModel, throwError } from '../../../../domain/test'

type SutTypes = {
  sut: DbSaveUser
  saveUserRepositorySpy: SaveUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveUserRepositorySpy = new SaveUserRepositorySpy()
  const sut = new DbSaveUser(saveUserRepositorySpy)
  return {
    sut,
    saveUserRepositorySpy
  }
}

describe('DbSaveUser Usecase', () => {
  test('Should call SaveUserRepository with correct values', async () => {
    const { sut, saveUserRepositorySpy } = makeSut()
    const addUserParams = mockUserModel()
    await sut.save(addUserParams)
    expect(saveUserRepositorySpy.data).toEqual({
      id: addUserParams.id,
      name: addUserParams.name,
      email: addUserParams.email,
      username: addUserParams.username
    })
  })

  test('Should throw if SaveUserRepository throws', async () => {
    const { sut, saveUserRepositorySpy } = makeSut()
    jest.spyOn(saveUserRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockUserModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut, saveUserRepositorySpy } = makeSut()
    const account = await sut.save(mockUserModel())
    expect(account).toEqual(saveUserRepositorySpy.userModel)
  })
})
