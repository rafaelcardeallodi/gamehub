import { PaginationParams } from '@/core/repositories/pagination-params'
import { Topic } from '../../enterprise/entities/topic'
import { TopicDetails } from '../../enterprise/entities/value-objects/topic-details'

export abstract class TopicsRepository {
  abstract findById(id: number): Promise<Topic | null>
  abstract findBySlug(slug: string): Promise<Topic | null>
  abstract findDetailsBySlug(slug: string): Promise<TopicDetails | null>
  abstract findManyRecent(params: PaginationParams): Promise<{
    topics: Topic[]
    totalCount: number
  }>

  abstract save(topic: Topic): Promise<void>
  abstract create(topic: Topic): Promise<void>
  abstract delete(topic: Topic): Promise<void>
}
