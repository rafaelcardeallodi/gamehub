import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TopicComment } from '@/domain/web/enterprise/entities/topic-comment'
import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaTopicCommentMapper {
  static toDomain(raw: PrismaComment): TopicComment {
    if (raw.parentType !== 'TOPIC') {
      throw new Error('Invalid comment type')
    }

    return TopicComment.create(
      {
        content: raw.content,
        topicId: new UniqueEntityID(raw.parentId),
        authorId: new UniqueEntityID(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    topicComment: TopicComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: topicComment.id.toValue(),
      content: topicComment.content,
      authorId: topicComment.authorId.toValue(),
      parentId: topicComment.topicId.toValue(),
      parentType: 'TOPIC',
      createdAt: topicComment.createdAt,
      updatedAt: topicComment.updatedAt,
    }
  }
}
