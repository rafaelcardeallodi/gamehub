import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Slug } from './slug'

export interface TopicDetailsProps {
  topicId: UniqueEntityID
  title: string
  content: string
  slug: Slug
  author: {
    id: UniqueEntityID
    username: string
  }
  createdAt: Date
  updatedAt?: Date | null
}

export class TopicDetails extends ValueObject<TopicDetailsProps> {
  get topicId() {
    return this.props.topicId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get author() {
    return this.props.author
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: TopicDetailsProps) {
    return new TopicDetails(props)
  }
}
