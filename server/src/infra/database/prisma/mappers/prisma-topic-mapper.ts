import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Topic } from '@/domain/web/enterprise/entities/topic'
import { Slug } from '@/domain/web/enterprise/entities/value-objects/slug'
import { Topic as PrismaTopic, Prisma } from '@prisma/client'

export class PrismaTopicMapper {
  static toDomain(raw: PrismaTopic): Topic {
    return Topic.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(topic: Topic): Prisma.TopicUncheckedCreateInput {
    return {
      id: topic.id.toValue(),
      authorId: topic.authorId.toValue(),
      title: topic.title,
      content: topic.content,
      slug: topic.slug.value,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
    }
  }
}
