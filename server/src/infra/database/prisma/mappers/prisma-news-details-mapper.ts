import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/web/enterprise/entities/value-objects/slug'
import { NewsDetails } from '@/domain/web/enterprise/entities/value-objects/news-details'
import { News as PrismaNews, User as PrismaUser } from '@prisma/client'

type PrismaNewsDetails = PrismaNews & {
  author: PrismaUser
}

export class PrismaNewsDetailsMapper {
  static toDomain(raw: PrismaNewsDetails): NewsDetails {
    return NewsDetails.create({
      newsId: new UniqueEntityID(raw.id),
      title: raw.title,
      content: raw.content,
      slug: Slug.create(raw.slug),
      author: {
        id: new UniqueEntityID(raw.author.id),
        username: raw.author.username,
      },
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
