import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TopicsRepository } from '../repositories/topics-repository'
import { TopicComment } from '../../enterprise/entities/topic-comment'
import { TopicCommentsRepository } from '../repositories/topic-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface CommentOnTopicUseCaseRequest {
  authorId: number
  topicId: number
  content: string
}

type CommentOnTopicUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    topicComment: TopicComment
  }
>

@Injectable()
export class CommentOnTopicUseCase {
  constructor(
    private topicsRepository: TopicsRepository,
    private topicCommentsRepository: TopicCommentsRepository,
  ) {}

  async execute({
    authorId,
    topicId,
    content,
  }: CommentOnTopicUseCaseRequest): Promise<CommentOnTopicUseCaseResponse> {
    const topic = await this.topicsRepository.findById(topicId)

    if (!topic) {
      return left(new ResourceNotFoundError())
    }

    const topicComment = TopicComment.create({
      authorId: new UniqueEntityID(authorId),
      topicId: topic.id,
      content,
    })

    await this.topicCommentsRepository.create(topicComment)

    return right({
      topicComment,
    })
  }
}
