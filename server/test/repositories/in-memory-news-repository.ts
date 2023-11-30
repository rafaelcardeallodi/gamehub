import { PaginationParams } from '@/core/repositories/pagination-params'
import { NewsRepository } from '@/domain/web/application/repositories/news-repository'
import { News } from '@/domain/web/enterprise/entities/news'
import { InMemoryUsersRepository } from './in-memory-users-repository'
import { NewsDetails } from '@/domain/web/enterprise/entities/value-objects/news-details'

export class InMemoryNewsRepository implements NewsRepository {
  public items: News[] = []

  constructor(private usersRepository: InMemoryUsersRepository) { }

  async findById(id: number) {
    const news = this.items.find((item) => item.id.toValue() === id)

    if (!news) {
      return null
    }

    return news
  }

  async findBySlug(slug: string) {
    const news = this.items.find((item) => item.slug.value === slug)

    if (!news) {
      return null
    }

    return news
  }

  async findDetailsBySlug(slug: string) {
    const news = this.items.find((item) => item.slug.value === slug)

    if (!news) {
      return null
    }

    const author = this.usersRepository.items.find((user) =>
      user.id.equals(news.authorId),
    )

    if (!author) {
      throw new Error(`Author with ID "${news.authorId}" does not exist.`)
    }

    return NewsDetails.create({
      newsId: news.id,
      title: news.title,
      content: news.content,
      slug: news.slug,
      author: {
        id: author.id,
        username: author.username,
      },
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
    })
  }

  async findManyRecent({ page }: PaginationParams) {
    const news = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return news
  }

  async save(news: News) {
    const itemIndex = this.items.findIndex((item) => item.id === news.id)

    this.items[itemIndex] = news
  }

  async delete(news: News) {
    const itemIndex = this.items.findIndex((item) => item.id === news.id)

    this.items.splice(itemIndex, 1)
  }

  async create(news: News) {
    this.items.push(news)
  }
}
