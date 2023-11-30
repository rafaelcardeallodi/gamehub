import { PaginationParams } from '@/core/repositories/pagination-params'
import { News } from '../../enterprise/entities/news'
import { NewsDetails } from '../../enterprise/entities/value-objects/news-details'

export abstract class NewsRepository {
  abstract findById(id: number): Promise<News | null>
  abstract findBySlug(slug: string): Promise<News | null>
  abstract findDetailsBySlug(slug: string): Promise<NewsDetails | null>
  abstract findManyRecent(params: PaginationParams): Promise<NewsDetails[]>
  abstract save(news: News): Promise<void>
  abstract create(news: News): Promise<void>
  abstract delete(news: News): Promise<void>
}
