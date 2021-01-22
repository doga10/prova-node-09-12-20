import { HttpRequest } from '../../../protocols'
import { AddUserController } from './add-user-controller'
import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { ValidationSpy, AddUserSpy } from '../../../test'
import { mockAddUserParams, throwError } from '../../../../domain/test'

const mockRequest = (): HttpRequest => ({
  body: mockAddUserParams()
})

type SutTypes = {
  sut: AddUserController
  validationSpy: ValidationSpy
  addUserSpy: AddUserSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addUserSpy = new AddUserSpy()
  const sut = new AddUserController(validationSpy, addUserSpy)
  return {
    sut,
    validationSpy,
    addUserSpy
  }
}

describe('AddUserController', () => {
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

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addUserSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addUserSpy.addUserParams).toEqual({ ...httpRequest.body, user: httpRequest.user })
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addUserSpy } = makeSut()
    jest.spyOn(addUserSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
