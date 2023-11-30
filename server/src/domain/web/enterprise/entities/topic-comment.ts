import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface TopicCommentProps extends CommentProps {
  topicId: UniqueEntityID
}

export class TopicComment extends Comment<TopicCommentProps> {
  get topicId() {
    return this.props.topicId
  }

  get excerpt() {
    return this.props.content.slice(0, 100).trimEnd().concat('...')
  }

  static create(
    props: Optional<TopicCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const topicComment = new TopicComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return topicComment
  }
}
