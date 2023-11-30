import { InMemoryNewsRepository } from 'test/repositories/in-memory-news-repository'
import { EditNewsUseCase } from './edit-news'
import { makeNews } from 'test/factories/make-news'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryNewsRepository: InMemoryNewsRepository
let sut: EditNewsUseCase

describe('Edit News', () => {
  beforeEach(() => {
    inMemoryNewsRepository = new InMemoryNewsRepository()
    sut = new EditNewsUseCase(inMemoryNewsRepository)
  })

  it('should be able to edit a news', async () => {
    const newNews = makeNews(
      {
        authorId: new UniqueEntityID(1),
      },
      new UniqueEntityID(24),
    )

    await inMemoryNewsRepository.create(newNews)

    await sut.execute({
      newsId: newNews.id.toValue(),
      authorId: 1,
      title: 'New title',
      content: 'New content',
    })

    expect(inMemoryNewsRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
  })

  it('should not be able to edit a news from another user', async () => {
    const newNews = makeNews(
      {
        authorId: new UniqueEntityID(1),
      },
      new UniqueEntityID(24),
    )

    await inMemoryNewsRepository.create(newNews)

    const result = await sut.execute({
      newsId: newNews.id.toValue(),
      authorId: 2,
      title: 'New title',
      content: 'New content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
