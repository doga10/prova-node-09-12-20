import { Controller, HttpRequest, HttpResponse, Validation, AddUser } from './add-user-controller-protocols'
import { badRequest, serverError, ok, noContent } from '../../../helpers/http/http-helper'

export class AddUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addUser: AddUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const user = await this.addUser.add(httpRequest.body)
      if (user) {
        return ok(user)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
