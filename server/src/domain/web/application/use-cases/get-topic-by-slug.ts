import { Either, left, right } from '@/core/either'
import { TopicsRepository } from '../repositories/topics-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { TopicDetails } from '../../enterprise/entities/value-objects/topic-details'

interface GetTopicBySlugUseCaseRequest {
  slug: string
}

type GetTopicBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    topic: TopicDetails
  }
>
@Injectable()
export class GetTopicBySlugUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    slug,
  }: GetTopicBySlugUseCaseRequest): Promise<GetTopicBySlugUseCaseResponse> {
    const topic = await this.topicsRepository.findDetailsBySlug(slug)

    if (!topic) {
      return left(new ResourceNotFoundError())
    }

    return right({
      topic,
    })
  }
}
