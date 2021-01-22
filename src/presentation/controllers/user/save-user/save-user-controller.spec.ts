import { HttpRequest } from '../../../protocols'
import { SaveUserController } from './save-user-controller'
import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { ValidationSpy, SaveUserSpy } from '../../../test'
import { mockAddUserParams, throwError } from '../../../../domain/test'

const mockRequest = (): HttpRequest => ({
  body: mockAddUserParams()
})

type SutTypes = {
  sut: SaveUserController
  validationSpy: ValidationSpy
  saveUserSpy: SaveUserSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const saveUserSpy = new SaveUserSpy()
  const sut = new SaveUserController(validationSpy, saveUserSpy)
  return {
    sut,
    validationSpy,
    saveUserSpy
  }
}

describe('SaveUserController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 500 if SaveUserSpy throws', async () => {
    const { sut, saveUserSpy } = makeSut()
    jest.spyOn(saveUserSpy, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
