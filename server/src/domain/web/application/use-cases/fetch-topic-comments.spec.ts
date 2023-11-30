import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryTopicCommentsRepository } from 'test/repositories/in-memory-topic-comments-repository'
import { FetchTopicCommentsUseCase } from './fetch-topic-comments'
import { makeTopicComment } from 'test/factories/make-topic-comment'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTopicCommentsRepository: InMemoryTopicCommentsRepository
let sut: FetchTopicCommentsUseCase

describe('Fetch Topic Comments', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTopicCommentsRepository = new InMemoryTopicCommentsRepository(
      inMemoryUsersRepository,
    )
    sut = new FetchTopicCommentsUseCase(inMemoryTopicCommentsRepository)
  })

  it('should be able to fetch topic comments', async () => {
    const user = makeUser({
      username: 'John Doe',
    })

    inMemoryUsersRepository.create(user)

    const comment1 = makeTopicComment({
      topicId: new UniqueEntityID(32),
      authorId: user.id,
    })

    const comment2 = makeTopicComment({
      topicId: new UniqueEntityID(32),
      authorId: user.id,
    })

    const comment3 = makeTopicComment({
      topicId: new UniqueEntityID(32),
      authorId: user.id,
    })

    await inMemoryTopicCommentsRepository.create(comment1)
    await inMemoryTopicCommentsRepository.create(comment2)
    await inMemoryTopicCommentsRepository.create(comment3)

    const result = await sut.execute({
      topicId: 32,
      page: 1,
    })

    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          commentId: comment1.id,
          author: expect.objectContaining({
            id: user.id,
            username: 'John Doe',
          }),
        }),
        expect.objectContaining({
          commentId: comment2.id,
          author: expect.objectContaining({
            id: user.id,
            username: 'John Doe',
          }),
        }),
        expect.objectContaining({
          commentId: comment3.id,
          author: expect.objectContaining({
            id: user.id,
            username: 'John Doe',
          }),
        }),
      ]),
    )
    expect(result.value?.comments).toHaveLength(3)
  })

  it('should be able to fetch topic comment with pagination', async () => {
    const user = makeUser({
      username: 'John Doe',
    })

    inMemoryUsersRepository.create(user)

    for (let i = 0; i < 25; i++) {
      await inMemoryTopicCommentsRepository.create(
        makeTopicComment({
          topicId: new UniqueEntityID(32),
          authorId: user.id,
        }),
      )
    }

    const result = await sut.execute({
      topicId: 32,
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(5)
  })
})
