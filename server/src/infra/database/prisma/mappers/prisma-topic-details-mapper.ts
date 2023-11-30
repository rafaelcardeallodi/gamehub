import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/web/enterprise/entities/value-objects/slug'
import { TopicDetails } from '@/domain/web/enterprise/entities/value-objects/topic-details'
import { Topic as PrismaTopic, User as PrismaUser } from '@prisma/client'

type PrismaTopicDetails = PrismaTopic & {
  author: PrismaUser
}

export class PrismaTopicDetailsMapper {
  static toDomain(raw: PrismaTopicDetails): TopicDetails {
    return TopicDetails.create({
      topicId: new UniqueEntityID(raw.id),
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
