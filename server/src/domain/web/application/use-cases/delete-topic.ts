import { Either, left, right } from '@/core/either'
import { TopicsRepository } from '../repositories/topics-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface DeleteTopicUseCaseRequest {
  authorId: number
  topicId: number
}

type DeleteTopicUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteTopicUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    topicId,
    authorId,
  }: DeleteTopicUseCaseRequest): Promise<DeleteTopicUseCaseResponse> {
    const topic = await this.topicsRepository.findById(topicId)

    if (!topic) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== topic.authorId.toValue()) {
      return left(new NotAllowedError())
    }

    await this.topicsRepository.delete(topic)

    return right(null)
  }
}
