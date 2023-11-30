export class CommentsPresenter {
  static toHTTP(comment: any) {
    return {
      id: comment.id.toValue(),
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }
  }
}
