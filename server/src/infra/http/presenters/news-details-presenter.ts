import { NewsDetails } from '@/domain/web/enterprise/entities/value-objects/news-details'

export class NewsDetailsPresenter {
  static toHTTP(newsDetails: NewsDetails) {
    return {
      id: newsDetails.newsId.toValue(),
      title: newsDetails.title,
      content: newsDetails.content,
      slug: newsDetails.slug.value,
      author: {
        id: newsDetails.author.id.toValue(),
        username: newsDetails.author.username,
      },
      createdAt: newsDetails.createdAt,
      updatedAt: newsDetails.updatedAt,
    }
  }
}
