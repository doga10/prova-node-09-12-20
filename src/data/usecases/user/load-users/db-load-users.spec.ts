import { DbLoadUsers } from './db-load-users'
import { LoadUsersRepositorySpy } from '../../../test'
import { throwError } from '../../../../domain/test'

type SutTypes = {
  sut: DbLoadUsers
  loadUsersRepositorySpy: LoadUsersRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadUsersRepositorySpy = new LoadUsersRepositorySpy()
  const sut = new DbLoadUsers(loadUsersRepositorySpy)
  return {
    sut,
    loadUsersRepositorySpy
  }
}

describe('DbLoadUsers Usecase', () => {
  test('Should return null if LoadUserByTokenRepository returns null', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    loadUsersRepositorySpy.userModel = null
    const user = await sut.load()
    expect(user).toBeNull()
  })

  test('Should return an User on success', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    const user = await sut.load()
    expect(user).toEqual(loadUsersRepositorySpy.userModel)
  })

  test('Should throw if LoadUserByTokenRepository throws', async () => {
    const { sut, loadUsersRepositorySpy } = makeSut()
    jest.spyOn(loadUsersRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
