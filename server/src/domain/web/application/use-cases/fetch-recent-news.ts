import { Either, right } from '@/core/either'
import { News } from '../../enterprise/entities/news'
import { NewsRepository } from '../repositories/news-repository'
import { Injectable } from '@nestjs/common'
import { NewsDetails } from '../../enterprise/entities/value-objects/news-details'

interface FetchRecentNewsUseCaseRequest {
  page: number
}

type FetchRecentNewsUseCaseResponse = Either<
  null,
  {
    news: NewsDetails[]
  }
>

@Injectable()
export class FetchRecentNewsUseCase {
  constructor(private newsRepository: NewsRepository) { }

  async execute({
    page,
  }: FetchRecentNewsUseCaseRequest): Promise<FetchRecentNewsUseCaseResponse> {
    const news = await this.newsRepository.findManyRecent({
      page,
    })

    return right({
      news,
    })
  }
}
