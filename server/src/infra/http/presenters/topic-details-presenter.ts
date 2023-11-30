import { TopicDetails } from '@/domain/web/enterprise/entities/value-objects/topic-details'

export class TopicDetailsPresenter {
  static toHTTP(topicDetails: TopicDetails) {
    return {
      id: topicDetails.topicId.toValue(),
      title: topicDetails.title,
      slug: topicDetails.slug.value,
      content: topicDetails.content,
      author: {
        id: topicDetails.author.id.toValue(),
        username: topicDetails.author.username,
        createdAt: topicDetails.author.createdAt,
      },
      createdAt: topicDetails.createdAt,
      updatedAt: topicDetails.updatedAt,
    }
  }
}
