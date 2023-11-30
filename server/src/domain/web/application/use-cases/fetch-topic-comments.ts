import { Either, right } from '@/core/either'
import { TopicCommentsRepository } from '../repositories/topic-comments-repository'
import { Injectable } from '@nestjs/common'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

interface FetchTopicCommentsUseCaseRequest {
  topicId: number
  page: number
}

type FetchTopicCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchTopicCommentsUseCase {
  constructor(private topicCommentsRepository: TopicCommentsRepository) {}

  async execute({
    page,
    topicId,
  }: FetchTopicCommentsUseCaseRequest): Promise<FetchTopicCommentsUseCaseResponse> {
    const comments =
      await this.topicCommentsRepository.findManyByTopicIdWithAuthor(topicId, {
        page,
      })

    return right({
      comments,
    })
  }
}
