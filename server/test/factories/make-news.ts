import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { News, NewsProps } from '@/domain/web/enterprise/entities/news'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaNewsMapper } from '@/infra/database/prisma/mappers/prisma-news-mapper'

export function makeNews(
  override: Partial<NewsProps> = {},
  id?: UniqueEntityID,
) {
  const news = News.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return news
}

@Injectable()
export class NewsFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaNews(data: Partial<NewsProps> = {}): Promise<News> {
    const news = makeNews(data)

    await this.prisma.news.create({
      data: PrismaNewsMapper.toPrisma(news),
    })

    return news
  }
}
