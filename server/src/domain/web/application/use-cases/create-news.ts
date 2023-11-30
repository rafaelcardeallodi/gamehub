import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'

import { News } from '../../enterprise/entities/news'
import { NewsRepository } from '../repositories/news-repository'

interface CreateNewsUseCaseRequest {
  authorId: number
  title: string
  content: string
}

type CreateNewsUseCaseResponse = Either<null, { news: News }>

@Injectable()
export class CreateNewsUseCase {
  constructor(private newsRepository: NewsRepository) { }

  async execute({
    authorId,
    title,
    content,
  }: CreateNewsUseCaseRequest): Promise<CreateNewsUseCaseResponse> {
    const news = News.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.newsRepository.create(news)

    return right({
      news,
    })
  }
}
