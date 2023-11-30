import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Slug } from './slug'

export interface NewsDetailsProps {
  newsId: UniqueEntityID
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

export class NewsDetails extends ValueObject<NewsDetailsProps> {
  get newsId() {
    return this.props.newsId
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

  static create(props: NewsDetailsProps) {
    return new NewsDetails(props)
  }
}
