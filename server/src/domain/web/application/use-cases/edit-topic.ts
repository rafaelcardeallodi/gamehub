import { Either, left, right } from '@/core/either'
import { Topic } from '../../enterprise/entities/topic'
import { TopicsRepository } from '../repositories/topics-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface EditTopicUseCaseRequest {
  authorId: number
  topicId: number
  title: string
  content: string
}

type EditTopicUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { topic: Topic }
>

@Injectable()
export class EditTopicUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    authorId,
    topicId,
    title,
    content,
  }: EditTopicUseCaseRequest): Promise<EditTopicUseCaseResponse> {
    const topic = await this.topicsRepository.findById(topicId)

    if (!topic) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== topic.authorId.toValue()) {
      return left(new NotAllowedError())
    }

    topic.title = title
    topic.content = content

    await this.topicsRepository.save(topic)

    return right({
      topic,
    })
  }
}
