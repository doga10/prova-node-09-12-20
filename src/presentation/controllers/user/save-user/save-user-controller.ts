import { Controller, HttpRequest, HttpResponse, Validation, SaveUser } from './save-user-controller-protocols'
import { badRequest, serverError, ok } from '../../../helpers/http/http-helper'

export class SaveUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveUser: SaveUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const user = await this.saveUser.save(httpRequest.body)
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
