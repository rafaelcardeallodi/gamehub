import { PaginationParams } from '@/core/repositories/pagination-params'
import { TopicsRepository } from '@/domain/web/application/repositories/topics-repository'
import { Topic } from '@/domain/web/enterprise/entities/topic'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaTopicMapper } from '../mappers/prisma-topic-mapper'
import { TopicDetails } from '@/domain/web/enterprise/entities/value-objects/topic-details'
import { PrismaTopicDetailsMapper } from '../mappers/prisma-topic-details-mapper'

@Injectable()
export class PrismaTopicsRepository implements TopicsRepository {
  constructor(private prisma: PrismaService) { }

  async findById(id: number): Promise<Topic | null> {
    const topic = await this.prisma.topic.findUnique({
      where: {
        id,
      },
    })

    if (!topic) {
      return null
    }

    return PrismaTopicMapper.toDomain(topic)
  }

  async findBySlug(slug: string): Promise<Topic | null> {
    const topic = await this.prisma.topic.findUnique({
      where: {
        slug,
      },
    })

    if (!topic) {
      return null
    }

    return PrismaTopicMapper.toDomain(topic)
  }

  async findDetailsBySlug(slug: string): Promise<TopicDetails | null> {
    const topic = await this.prisma.topic.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
      },
    })

    if (!topic) {
      return null
    }

    return PrismaTopicDetailsMapper.toDomain(topic)
  }

  async findManyRecent({ page }: PaginationParams): Promise<{
    topics: Topic[]
    totalCount: number
  }> {
    const topics = await this.prisma.topic.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    const totalCount = await this.prisma.topic.count()

    return {
      topics: topics.map(PrismaTopicMapper.toDomain),
      totalCount,
    }
  }

  async create(topic: Topic): Promise<void> {
    const data = PrismaTopicMapper.toPrisma(topic)

    await this.prisma.topic.create({
      data,
    })
  }

  async save(topic: Topic): Promise<void> {
    const data = PrismaTopicMapper.toPrisma(topic)

    await this.prisma.topic.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(topic: Topic): Promise<void> {
    await this.prisma.topic.delete({
      where: {
        id: topic.id.toValue(),
      },
    })
  }
}
