import { PaginationParams } from '@/core/repositories/pagination-params'
import { TopicComment } from '../../enterprise/entities/topic-comment'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

export abstract class TopicCommentsRepository {
  abstract findById(id: number): Promise<TopicComment | null>

  abstract findManyByTopicId(
    topicId: number,
    params: PaginationParams,
  ): Promise<TopicComment[]>

  abstract findManyByTopicIdWithAuthor(
    topicId: number,
    params: PaginationParams,
  ): Promise<{
    comments: CommentWithAuthor[]
    totalCount: number
  }>

  abstract create(topicComment: TopicComment): Promise<void>
  abstract delete(topicComment: TopicComment): Promise<void>
}
