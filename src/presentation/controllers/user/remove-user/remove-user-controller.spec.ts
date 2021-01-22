import { HttpRequest } from '../../../protocols'
import { RemoveUserController } from './remove-user-controller'
import { noContent, serverError } from '../../../helpers/http/http-helper'
import { RemoveUserSpy } from '../../../test'
import { throwError } from '../../../../domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  params: faker.random.uuid()
})

type SutTypes = {
  sut: RemoveUserController
  saveUserSpy: RemoveUserSpy
}

const makeSut = (): SutTypes => {
  const saveUserSpy = new RemoveUserSpy()
  const sut = new RemoveUserController(saveUserSpy)
  return {
    sut,
    saveUserSpy
  }
}

describe('RemoveUserController', () => {
  test('Should return 500 if RemoveUserSpy throws', async () => {
    const { sut, saveUserSpy } = makeSut()
    jest.spyOn(saveUserSpy, 'remove').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
