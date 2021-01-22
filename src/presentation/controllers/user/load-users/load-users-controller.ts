import { Controller, HttpRequest, HttpResponse, LoadUsers } from './load-users-controller-protocols'
import { ok, serverError, noContent } from '../../../helpers/http/http-helper'

export class LoadUsersController implements Controller {
  constructor (private readonly loadUsers: LoadUsers) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const contacts = await this.loadUsers.load()
      return contacts.length ? ok(contacts) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
