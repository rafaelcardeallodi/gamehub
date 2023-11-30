import { PaginationParams } from '@/core/repositories/pagination-params'
import { TopicCommentsRepository } from '@/domain/web/application/repositories/topic-comments-repository'
import { TopicComment } from '@/domain/web/enterprise/entities/topic-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaTopicCommentMapper } from '../mappers/prisma-topic-comment-mapper'
import { CommentWithAuthor } from '@/domain/web/enterprise/entities/value-objects/comment-with-author'
import { PrismaCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'

@Injectable()
export class PrismaTopicCommentsRepository implements TopicCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<TopicComment | null> {
    const topicComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!topicComment) {
      return null
    }

    return PrismaTopicCommentMapper.toDomain(topicComment)
  }

  async findManyByTopicId(
    topicId: number,
    { page }: PaginationParams,
  ): Promise<TopicComment[]> {
    const topicComments = await this.prisma.comment.findMany({
      where: {
        parentId: topicId,
        parentType: 'TOPIC',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return topicComments.map(PrismaTopicCommentMapper.toDomain)
  }

  async findManyByTopicIdWithAuthor(
    topicId: number,
    { page }: PaginationParams,
  ): Promise<{
    comments: CommentWithAuthor[]
    totalCount: number
  }> {
    const topicComments = await this.prisma.comment.findMany({
      where: {
        parentId: topicId,
        parentType: 'TOPIC',
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    const totalCount = await this.prisma.comment.count({
      where: {
        parentType: 'TOPIC',
        parentId: topicId,
      },
    })

    return {
      comments: topicComments.map(PrismaCommentWithAuthorMapper.toDomain),
      totalCount,
    }
  }

  async create(topicComment: TopicComment): Promise<void> {
    const data = PrismaTopicCommentMapper.toPrisma(topicComment)

    await this.prisma.comment.create({
      data: {
        ...data,
        parentType: 'TOPIC',
      },
    })
  }

  async delete(topicComment: TopicComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: topicComment.id.toValue(),
      },
    })
  }
}
