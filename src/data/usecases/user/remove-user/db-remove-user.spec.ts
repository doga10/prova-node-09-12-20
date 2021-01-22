import { DbRemoveUser } from './db-remove-user'
import { RemoveUserRepositorySpy } from '../../../test'
import { throwError } from '../../../../domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbRemoveUser
  removeUserRepositorySpy: RemoveUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeUserRepositorySpy = new RemoveUserRepositorySpy()
  const sut = new DbRemoveUser(removeUserRepositorySpy)
  return {
    sut,
    removeUserRepositorySpy
  }
}

describe('DbRemoveUser Usecase', () => {
  test('Should call RemoveUserRepository with correct values', async () => {
    const { sut, removeUserRepositorySpy } = makeSut()
    const id = faker.random.uuid()
    await sut.remove(id)
    expect(removeUserRepositorySpy.id).toEqual(id)
  })

  test('Should throw if RemoveUserRepository throws', async () => {
    const { sut, removeUserRepositorySpy } = makeSut()
    jest.spyOn(removeUserRepositorySpy, 'remove').mockImplementationOnce(throwError)
    const promise = sut.remove(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
