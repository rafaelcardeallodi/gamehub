import { Either, left, right } from '@/core/either'
import { TopicCommentsRepository } from '../repositories/topic-comments-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface DeleteTopicCommentUseCaseRequest {
  authorId: number
  topicCommentId: number
}

type DeleteTopicCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteTopicCommentUseCase {
  constructor(private topicCommentsRepository: TopicCommentsRepository) {}

  async execute({
    authorId,
    topicCommentId,
  }: DeleteTopicCommentUseCaseRequest): Promise<DeleteTopicCommentUseCaseResponse> {
    const topicComment =
      await this.topicCommentsRepository.findById(topicCommentId)

    if (!topicComment) {
      return left(new ResourceNotFoundError())
    }

    if (topicComment.authorId.toValue() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.topicCommentsRepository.delete(topicComment)

    return right(null)
  }
}
