import { Topic } from '@/domain/web/enterprise/entities/topic'
export class TopicPresenter {
  static toHTTP(topic: Topic) {
    const regexForStripHTML = /<[^>]*>?/gm

    return {
      id: topic.id.toValue(),
      title: topic.title,
      slug: topic.slug.value,
      excerpt: topic.excerpt.replaceAll(regexForStripHTML, ''),
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
    }
  }
}
