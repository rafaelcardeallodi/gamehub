import { PaginationParams } from '@/core/repositories/pagination-params'
import { TopicsRepository } from '@/domain/web/application/repositories/topics-repository'
import { Topic } from '@/domain/web/enterprise/entities/topic'
import { InMemoryUsersRepository } from './in-memory-users-repository'
import { TopicDetails } from '@/domain/web/enterprise/entities/value-objects/topic-details'

export class InMemoryTopicsRepository implements TopicsRepository {
  constructor(private usersRepository: InMemoryUsersRepository) { }

  public items: Topic[] = []

  async findById(id: number) {
    const topic = this.items.find((item) => item.id.toValue() === id)

    if (!topic) {
      return null
    }

    return topic
  }

  async findBySlug(slug: string) {
    const topic = this.items.find((item) => item.slug.value === slug)

    if (!topic) {
      return null
    }

    return topic
  }

  async findDetailsBySlug(slug: string) {
    const topic = this.items.find((item) => item.slug.value === slug)

    if (!topic) {
      return null
    }

    const author = this.usersRepository.items.find((user) =>
      user.id.equals(topic.authorId),
    )

    if (!author) {
      throw new Error(`Author with ID "${topic.authorId}" does not exist.`)
    }

    return TopicDetails.create({
      topicId: topic.id,
      title: topic.title,
      content: topic.content,
      slug: topic.slug,
      author: {
        id: author.id,
        username: author.username,
      },
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
    })
  }

  async findManyRecent({ page }: PaginationParams) {
    const topics = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 10, page * 10)

    const totalCount = this.items.length

    return {
      topics,
      totalCount,
    }
  }

  async save(topic: Topic) {
    const itemIndex = this.items.findIndex((item) => item.id === topic.id)

    this.items[itemIndex] = topic
  }

  async delete(topic: Topic) {
    const itemIndex = this.items.findIndex((item) => item.id === topic.id)

    this.items.splice(itemIndex, 1)
  }

  async create(topic: Topic) {
    this.items.push(topic)
  }
}
