import { PaginationParams } from '@/core/repositories/pagination-params'
import { TopicCommentsRepository } from '@/domain/web/application/repositories/topic-comments-repository'
import { TopicComment } from '@/domain/web/enterprise/entities/topic-comment'
import { InMemoryUsersRepository } from './in-memory-users-repository'
import { CommentWithAuthor } from '@/domain/web/enterprise/entities/value-objects/comment-with-author'

export class InMemoryTopicCommentsRepository
  implements TopicCommentsRepository
{
  public items: TopicComment[] = []

  constructor(private usersRepository: InMemoryUsersRepository) {}

  async findById(id: number) {
    const topicComment = this.items.find((item) => item.id.toValue() === id)

    if (!topicComment) {
      return null
    }

    return topicComment
  }

  async findManyByTopicId(topicId: number, { page }: PaginationParams) {
    const topicComments = this.items
      .filter((item) => item.topicId.toValue() === topicId)
      .slice((page - 1) * 20, page * 20)

    return topicComments
  }

  async findManyByTopicIdWithAuthor(
    topicId: number,
    { page }: PaginationParams,
  ) {
    const topicComments = this.items
      .filter((item) => item.topicId.toValue() === topicId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.usersRepository.items.find((user) =>
          user.id.equals(comment.authorId),
        )

        if (!author) {
          throw new Error(
            `Author with ID "${comment.authorId}" does not exist.`,
          )
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          author: {
            id: author.id,
            username: author.username,
            createdAt: author.createdAt,
          },
        })
      })

    return {
      comments: topicComments,
      totalCount: this.items.filter(
        (item) => item.topicId.toValue() === topicId,
      ).length,
    }
  }

  async create(topicComment: TopicComment) {
    this.items.push(topicComment)
  }

  async delete(topicComment: TopicComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === topicComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
