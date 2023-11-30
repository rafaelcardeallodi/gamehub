import { InMemoryNewsRepository } from 'test/repositories/in-memory-news-repository'
import { GetNewsBySlugUseCase } from './get-news-by-slug'
import { makeNews } from 'test/factories/make-news'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryNewsRepository: InMemoryNewsRepository
let sut: GetNewsBySlugUseCase

describe('Get News By Slug', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryNewsRepository = new InMemoryNewsRepository(inMemoryUsersRepository)
    sut = new GetNewsBySlugUseCase(inMemoryNewsRepository)
  })

  it('should be able to get a news by slug', async () => {
    const author = makeUser({
      username: 'John Doe',
    })

    await inMemoryUsersRepository.create(author)

    const newNews = makeNews({
      slug: Slug.create('example-news'),
      authorId: author.id,
    })

    await inMemoryNewsRepository.create(newNews)

    const result = await sut.execute({
      slug: 'example-news',
    })

    expect(result.value).toMatchObject({
      news: expect.objectContaining({
        title: newNews.title,
        author: expect.objectContaining({
          username: 'John Doe',
        }),
      }),
    })
  })
})
