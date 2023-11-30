import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { GetUserByIdUseCase } from './get-user-by-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserByIdUseCase

describe('Get User By Id', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserByIdUseCase(inMemoryUsersRepository)
  })

  it('should be able to get a user by id', async () => {
    const user = makeUser({
      username: 'John Doe',
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toValue(),
    })

    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        username: 'John Doe',
      }),
    })
  })
})
