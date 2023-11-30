import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { GetTopicBySlugUseCase } from './get-topic-by-slug'
import { makeTopic } from 'test/factories/make-topic'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTopicsRepository: InMemoryTopicsRepository
let sut: GetTopicBySlugUseCase

describe('Get Topic By Slug', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTopicsRepository = new InMemoryTopicsRepository(
      inMemoryUsersRepository,
    )
    sut = new GetTopicBySlugUseCase(inMemoryTopicsRepository)
  })

  it('should be able to get a topic by slug', async () => {
    const author = makeUser({
      username: 'John Doe',
    })

    await inMemoryUsersRepository.create(author)

    const newTopic = makeTopic({
      slug: Slug.create('example-topic'),
      authorId: author.id,
    })

    await inMemoryTopicsRepository.create(newTopic)

    const result = await sut.execute({
      slug: 'example-topic',
    })

    expect(result.value).toMatchObject({
      topic: expect.objectContaining({
        title: newTopic.title,
        author: expect.objectContaining({
          username: 'John Doe',
        }),
      }),
    })
  })
})
