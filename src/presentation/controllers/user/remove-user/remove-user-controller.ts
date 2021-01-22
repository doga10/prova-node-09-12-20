import { Controller, HttpRequest, HttpResponse, RemoveUser } from './remove-user-controller-protocols'
import { serverError, noContent } from '../../../helpers/http/http-helper'

export class RemoveUserController implements Controller {
  constructor (
    private readonly removeUser: RemoveUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.removeUser.remove(httpRequest.params)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
