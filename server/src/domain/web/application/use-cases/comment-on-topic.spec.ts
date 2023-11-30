import { InMemoryTopicCommentsRepository } from 'test/repositories/in-memory-topic-comments-repository'
import { CommentOnTopicUseCase } from './comment-on-topic'
import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { makeTopic } from 'test/factories/make-topic'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTopicsRepository: InMemoryTopicsRepository
let inMemoryTopicCommentsRepository: InMemoryTopicCommentsRepository
let sut: CommentOnTopicUseCase

describe('Comment on Topic', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTopicsRepository = new InMemoryTopicsRepository(
      inMemoryUsersRepository,
    )
    inMemoryTopicCommentsRepository = new InMemoryTopicCommentsRepository(
      inMemoryUsersRepository,
    )

    sut = new CommentOnTopicUseCase(
      inMemoryTopicsRepository,
      inMemoryTopicCommentsRepository,
    )
  })

  it('should be able to comment on topic', async () => {
    const topic = makeTopic()

    await inMemoryTopicsRepository.create(topic)

    const result = await sut.execute({
      topicId: topic.id.toValue(),
      authorId: topic.authorId.toValue(),
      content: 'Conteúdo do comentário',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryTopicCommentsRepository.items[0]).toEqual(
        result.value.topicComment,
      )
    }
  })
})
