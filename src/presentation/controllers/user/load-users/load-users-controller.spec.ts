import { LoadUsersController } from './load-users-controller'
import { HttpRequest } from './load-users-controller-protocols'
import { ok, serverError, noContent } from '../../../helpers/http/http-helper'
import { LoadUsersSpy } from '../../../test'
import { mockUserModel, throwError } from '../../../../domain/test'

const mockRequest = (): HttpRequest => ({ user: mockUserModel() })

type SutTypes = {
  sut: LoadUsersController
  loadUsersSpy: LoadUsersSpy
}

const makeSut = (): SutTypes => {
  const loadUsersSpy = new LoadUsersSpy()
  const sut = new LoadUsersController(loadUsersSpy)
  return {
    sut,
    loadUsersSpy
  }
}

describe('LoadUsers Controller', () => {
  test('Should return 200 on success', async () => {
    const { sut, loadUsersSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadUsersSpy.userModel))
  })

  test('Should return 204 if LoadUsers returns empty', async () => {
    const { sut, loadUsersSpy } = makeSut()
    loadUsersSpy.userModel = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadUsers throws', async () => {
    const { sut, loadUsersSpy } = makeSut()
    jest.spyOn(loadUsersSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
