import { InMemoryTopicCommentsRepository } from 'test/repositories/in-memory-topic-comments-repository'
import { DeleteTopicCommentUseCase } from './delete-topic-comment'
import { makeTopicComment } from 'test/factories/make-topic-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTopicCommentsRepository: InMemoryTopicCommentsRepository
let sut: DeleteTopicCommentUseCase

describe('Delete Topic Comment', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTopicCommentsRepository = new InMemoryTopicCommentsRepository(
      inMemoryUsersRepository,
    )

    sut = new DeleteTopicCommentUseCase(inMemoryTopicCommentsRepository)
  })

  it('should be able to delete a topic comment', async () => {
    const topicComment = makeTopicComment()

    await inMemoryTopicCommentsRepository.create(topicComment)

    await sut.execute({
      authorId: topicComment.authorId.toValue(),
      topicCommentId: topicComment.id.toValue(),
    })

    expect(inMemoryTopicCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user topic comment', async () => {
    const topicComment = makeTopicComment({
      authorId: new UniqueEntityID(1),
    })

    await inMemoryTopicCommentsRepository.create(topicComment)

    const result = await sut.execute({
      authorId: 2,
      topicCommentId: topicComment.id.toValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
