import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { makeTopic } from 'test/factories/make-topic'
import { FetchRecentTopicsUseCase } from './fetch-recent-topics'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTopicsRepository: InMemoryTopicsRepository
let sut: FetchRecentTopicsUseCase

describe('Fetch Recent Topics', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTopicsRepository = new InMemoryTopicsRepository(
      inMemoryUsersRepository,
    )
    sut = new FetchRecentTopicsUseCase(inMemoryTopicsRepository)
  })

  it('should be able to fetch recent topics', async () => {
    await inMemoryTopicsRepository.create(
      makeTopic({ createdAt: new Date(2023, 0, 20) }),
    )
    await inMemoryTopicsRepository.create(
      makeTopic({ createdAt: new Date(2023, 0, 18) }),
    )
    await inMemoryTopicsRepository.create(
      makeTopic({ createdAt: new Date(2023, 0, 26) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.topics).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 0, 26),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 20),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 18),
      }),
    ])
  })

  it('should be able to fetch recent topics with pagination', async () => {
    for (let i = 0; i < 15; i++) {
      await inMemoryTopicsRepository.create(makeTopic())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.topics).toHaveLength(5)
  })
})
