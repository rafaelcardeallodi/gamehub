import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { EditTopicUseCase } from './edit-topic'
import { makeTopic } from 'test/factories/make-topic'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTopicsRepository: InMemoryTopicsRepository
let sut: EditTopicUseCase

describe('Edit Topic', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTopicsRepository = new InMemoryTopicsRepository(
      inMemoryUsersRepository,
    )
    sut = new EditTopicUseCase(inMemoryTopicsRepository)
  })

  it('should be able to edit a topic', async () => {
    const newTopic = makeTopic(
      {
        authorId: new UniqueEntityID(1),
      },
      new UniqueEntityID(24),
    )

    await inMemoryTopicsRepository.create(newTopic)

    await sut.execute({
      topicId: newTopic.id.toValue(),
      authorId: 1,
      title: 'New title',
      content: 'New content',
    })

    expect(inMemoryTopicsRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
  })

  it('should not be able to edit a topic from another user', async () => {
    const newTopic = makeTopic(
      {
        authorId: new UniqueEntityID(1),
      },
      new UniqueEntityID(24),
    )

    await inMemoryTopicsRepository.create(newTopic)

    const result = await sut.execute({
      topicId: newTopic.id.toValue(),
      authorId: 2,
      title: 'New title',
      content: 'New content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
