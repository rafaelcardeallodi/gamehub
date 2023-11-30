import { News } from '@/domain/web/enterprise/entities/news'

export class NewsPresenter {
  static toHTTP(news: News) {
    return {
      id: news.id.toValue(),
      title: news.title,
      slug: news.slug.value,
      content: news.content,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
    }
  }
}
