import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  TopicComment,
  TopicCommentProps,
} from '@/domain/web/enterprise/entities/topic-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaTopicCommentMapper } from '@/infra/database/prisma/mappers/prisma-topic-comment-mapper'

export function makeTopicComment(
  override: Partial<TopicCommentProps> = {},
  id?: UniqueEntityID,
) {
  const topicComment = TopicComment.create(
    {
      authorId: new UniqueEntityID(1),
      topicId: new UniqueEntityID(1),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return topicComment
}

@Injectable()
export class TopicCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaTopicComment(
    data: Partial<TopicCommentProps> = {},
  ): Promise<TopicComment> {
    const topicComment = makeTopicComment(data)

    await this.prisma.comment.create({
      data: PrismaTopicCommentMapper.toPrisma(topicComment),
    })

    return topicComment
  }
}
