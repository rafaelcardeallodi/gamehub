import { InMemoryNewsRepository } from 'test/repositories/in-memory-news-repository'
import { DeleteNewsUseCase } from './delete-news'
import { makeNews } from 'test/factories/make-news'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryNewsRepository: InMemoryNewsRepository
let sut: DeleteNewsUseCase

describe('Delete News', () => {
  beforeEach(() => {
    inMemoryNewsRepository = new InMemoryNewsRepository()
    sut = new DeleteNewsUseCase(inMemoryNewsRepository)
  })

  it('should be able to delete a news', async () => {
    const newNews = makeNews(
      {
        authorId: new UniqueEntityID(1),
      },
      new UniqueEntityID(24),
    )

    await inMemoryNewsRepository.create(newNews)

    await sut.execute({
      newsId: 24,
      authorId: 1,
    })

    expect(inMemoryNewsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a news from another user', async () => {
    const newNews = makeNews(
      {
        authorId: new UniqueEntityID(1),
      },
      new UniqueEntityID(24),
    )

    await inMemoryNewsRepository.create(newNews)

    const result = await sut.execute({
      newsId: 24,
      authorId: 2,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
