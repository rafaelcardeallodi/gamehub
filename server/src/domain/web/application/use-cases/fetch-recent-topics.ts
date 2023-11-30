import { Either, right } from '@/core/either'
import { Topic } from '../../enterprise/entities/topic'
import { TopicsRepository } from '../repositories/topics-repository'
import { Injectable } from '@nestjs/common'

interface FetchRecentTopicsUseCaseRequest {
  page: number
}

type FetchRecentTopicsUseCaseResponse = Either<
  null,
  {
    topics: Topic[]
    totalCount: number
  }
>

@Injectable()
export class FetchRecentTopicsUseCase {
  constructor(private topicsRepository: TopicsRepository) { }

  async execute({
    page,
  }: FetchRecentTopicsUseCaseRequest): Promise<FetchRecentTopicsUseCaseResponse> {
    const result = await this.topicsRepository.findManyRecent({
      page,
    })

    return right({
      topics: result.topics,
      totalCount: result.totalCount,
    })
  }
}
