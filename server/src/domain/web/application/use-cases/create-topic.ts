import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'

import { Topic } from '../../enterprise/entities/topic'
import { TopicsRepository } from '../repositories/topics-repository'

interface CreateTopicUseCaseRequest {
  authorId: number
  title: string
  content: string
}

type CreateTopicUseCaseResponse = Either<null, { topic: Topic }>

@Injectable()
export class CreateTopicUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateTopicUseCaseRequest): Promise<CreateTopicUseCaseResponse> {
    const topic = Topic.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.topicsRepository.create(topic)

    return right({
      topic,
    })
  }
}
