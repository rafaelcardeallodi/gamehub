import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { NewsRepository } from '../repositories/news-repository'
import { NewsDetails } from '../../enterprise/entities/value-objects/news-details'

interface GetNewsBySlugUseCaseRequest {
  slug: string
}

type GetNewsBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    news: NewsDetails
  }
>
@Injectable()
export class GetNewsBySlugUseCase {
  constructor(private newsRepository: NewsRepository) { }

  async execute({
    slug,
  }: GetNewsBySlugUseCaseRequest): Promise<GetNewsBySlugUseCaseResponse> {
    const news = await this.newsRepository.findDetailsBySlug(slug)

    if (!news) {
      return left(new ResourceNotFoundError())
    }

    return right({
      news,
    })
  }
}
