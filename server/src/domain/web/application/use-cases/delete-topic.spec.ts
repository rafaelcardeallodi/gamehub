import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { DeleteTopicUseCase } from './delete-topic'
import { makeTopic } from 'test/factories/make-topic'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTopicsRepository: InMemoryTopicsRepository
let sut: DeleteTopicUseCase

describe('Delete Topic', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTopicsRepository = new InMemoryTopicsRepository(
      inMemoryUsersRepository,
    )
    sut = new DeleteTopicUseCase(inMemoryTopicsRepository)
  })

  it('should be able to delete a topic', async () => {
    const newTopic = makeTopic(
      {
        authorId: new UniqueEntityID(1),
      },
      new UniqueEntityID(24),
    )

    await inMemoryTopicsRepository.create(newTopic)

    await sut.execute({
      topicId: 24,
      authorId: 1,
    })

    expect(inMemoryTopicsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a topic from another user', async () => {
    const newTopic = makeTopic(
      {
        authorId: new UniqueEntityID(1),
      },
      new UniqueEntityID(24),
    )

    await inMemoryTopicsRepository.create(newTopic)

    const result = await sut.execute({
      topicId: 24,
      authorId: 2,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
