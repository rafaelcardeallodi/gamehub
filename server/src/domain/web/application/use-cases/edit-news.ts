import { Either, left, right } from '@/core/either'
import { News } from '../../enterprise/entities/news'
import { NewsRepository } from '../repositories/news-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface EditNewsUseCaseRequest {
  authorId: number
  newsId: number
  title: string
  content: string
}

type EditNewsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { news: News }
>

@Injectable()
export class EditNewsUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute({
    authorId,
    newsId,
    title,
    content,
  }: EditNewsUseCaseRequest): Promise<EditNewsUseCaseResponse> {
    const news = await this.newsRepository.findById(newsId)

    if (!news) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== news.authorId.toValue()) {
      return left(new NotAllowedError())
    }

    news.title = title
    news.content = content

    await this.newsRepository.save(news)

    return right({
      news,
    })
  }
}
