import { TopicDetails } from '@/domain/web/enterprise/entities/value-objects/topic-details'

export class TopicDetailsPresenter {
  static toHTTP(topicDetails: TopicDetails) {
    return {
      id: topicDetails.topicId.toValue(),
      title: topicDetails.title,
      slug: topicDetails.slug.value,
      author: {
        id: topicDetails.author.id.toValue(),
        username: topicDetails.author.username,
      },
      createdAt: topicDetails.createdAt,
      updatedAt: topicDetails.updatedAt,
    }
  }
}
