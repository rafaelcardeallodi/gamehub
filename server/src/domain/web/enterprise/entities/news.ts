import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'

export interface NewsProps {
  authorId: UniqueEntityID
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date | null
}

export class News extends Entity<NewsProps> {
  get authorId() {
    return this.props.authorId
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.props.content.slice(0, 100).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<NewsProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const news = new News(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return news
  }
}
