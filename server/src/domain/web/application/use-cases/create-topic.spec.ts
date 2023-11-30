import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateTopicUseCase } from './create-topic'
import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTopicsRepository: InMemoryTopicsRepository
let sut: CreateTopicUseCase

describe('Create Topic', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTopicsRepository = new InMemoryTopicsRepository(
      inMemoryUsersRepository,
    )
    sut = new CreateTopicUseCase(inMemoryTopicsRepository)
  })

  it('should be able to create a topic', async () => {
    const result = await sut.execute({
      authorId: 1,
      title: 'Novo tópico',
      content: 'Conteúdo do tópico',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryTopicsRepository.items[0]).toEqual(result.value?.topic)
  })
})
