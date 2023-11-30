import { InMemoryNewsRepository } from 'test/repositories/in-memory-news-repository'
import { makeNews } from 'test/factories/make-news'
import { FetchRecentNewsUseCase } from './fetch-recent-news'

let inMemoryNewsRepository: InMemoryNewsRepository
let sut: FetchRecentNewsUseCase

describe('Fetch Recent News', () => {
  beforeEach(() => {
    inMemoryNewsRepository = new InMemoryNewsRepository()
    sut = new FetchRecentNewsUseCase(inMemoryNewsRepository)
  })

  it('should be able to fetch recent news', async () => {
    await inMemoryNewsRepository.create(
      makeNews({ createdAt: new Date(2023, 0, 20) }),
    )
    await inMemoryNewsRepository.create(
      makeNews({ createdAt: new Date(2023, 0, 18) }),
    )
    await inMemoryNewsRepository.create(
      makeNews({ createdAt: new Date(2023, 0, 26) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.news).toEqual([
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

  it('should be able to fetch recent news with pagination', async () => {
    for (let i = 0; i < 25; i++) {
      await inMemoryNewsRepository.create(makeNews())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.news).toHaveLength(5)
  })
})
