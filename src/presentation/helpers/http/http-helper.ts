import { HttpResponse } from '../../../presentation/protocols/http'
import { ServerError } from '../../../presentation/errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  data: null
})
