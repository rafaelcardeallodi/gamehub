import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { NewsRepository } from '@/domain/web/application/repositories/news-repository'
import { News } from '@/domain/web/enterprise/entities/news'
import { PrismaService } from '../prisma.service'
import { PrismaNewsMapper } from '../mappers/prisma-news-mapper'
import { NewsDetails } from '@/domain/web/enterprise/entities/value-objects/news-details'
import { PrismaNewsDetailsMapper } from '../mappers/prisma-news-details-mapper'

@Injectable()
export class PrismaNewsRepository implements NewsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<News | null> {
    const news = await this.prisma.news.findUnique({
      where: {
        id,
      },
    })

    if (!news) {
      return null
    }

    return PrismaNewsMapper.toDomain(news)
  }

  async findBySlug(slug: string): Promise<News | null> {
    const news = await this.prisma.news.findUnique({
      where: {
        slug,
      },
    })

    if (!news) {
      return null
    }

    return PrismaNewsMapper.toDomain(news)
  }

  async findDetailsBySlug(slug: string): Promise<NewsDetails | null> {
    const news = await this.prisma.news.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
      },
    })

    if (!news) {
      return null
    }

    return PrismaNewsDetailsMapper.toDomain(news)
  }

  async findManyRecent({ page }: PaginationParams): Promise<NewsDetails[]> {
    const news = await this.prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
      take: 50,
      skip: (page - 1) * 50,
    })

    return news.map(PrismaNewsDetailsMapper.toDomain)
  }

  async create(news: News): Promise<void> {
    const data = PrismaNewsMapper.toPrisma(news)

    await this.prisma.news.create({
      data,
    })
  }

  async save(news: News): Promise<void> {
    const data = PrismaNewsMapper.toPrisma(news)

    await this.prisma.news.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(news: News): Promise<void> {
    await this.prisma.news.delete({
      where: {
        id: news.id.toValue(),
      },
    })
  }
}
