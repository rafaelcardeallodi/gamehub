import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { News } from '@/domain/web/enterprise/entities/news'
import { Slug } from '@/domain/web/enterprise/entities/value-objects/slug'
import { News as PrismaNews, Prisma } from '@prisma/client'

export class PrismaNewsMapper {
  static toDomain(raw: PrismaNews): News {
    return News.create(
      {
        title: raw.title,
        content: raw.content,
        slug: Slug.create(raw.slug),
        authorId: new UniqueEntityID(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(news: News): Prisma.NewsUncheckedCreateInput {
    return {
      id: news.id.toValue(),
      title: news.title,
      content: news.content,
      slug: news.slug.value,
      authorId: news.authorId.toValue(),
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
    }
  }
}
