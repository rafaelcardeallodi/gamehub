import { Either, left, right } from '@/core/either'
import { NewsRepository } from '../repositories/news-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface DeleteNewsUseCaseRequest {
  authorId: number
  newsId: number
}

type DeleteNewsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteNewsUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute({
    newsId,
    authorId,
  }: DeleteNewsUseCaseRequest): Promise<DeleteNewsUseCaseResponse> {
    const news = await this.newsRepository.findById(newsId)

    if (!news) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== news.authorId.toValue()) {
      return left(new NotAllowedError())
    }

    await this.newsRepository.delete(news)

    return right(null)
  }
}
