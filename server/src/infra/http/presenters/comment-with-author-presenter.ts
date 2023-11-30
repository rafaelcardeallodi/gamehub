import { CommentWithAuthor } from '@/domain/web/enterprise/entities/value-objects/comment-with-author'

export class CommentWithAuthorPresenter {
  static toHTTP(comment: CommentWithAuthor) {
    return {
      commentId: comment.commentId.toValue(),
      content: comment.content,
      author: {
        id: comment.author.id.toValue(),
        username: comment.author.username,
        createdAt: comment.author.createdAt,
      },
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }
  }
}
