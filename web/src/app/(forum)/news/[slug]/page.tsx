import { NewsContent } from '@/components/News/NewsContent'
import { NewsItem } from '@/components/News/NewsItem'
import { api } from '@/data/api'

export interface News {
  id: number
  title: string
  content: string
  slug: string
  author: {
    id: number
    username: string
  }
  createdAt: string
  updatedAt: string
}

interface NewsProps {
  params: {
    slug: string
  }
}

export default async function News({ params }: NewsProps) {
  async function getNewsBySlug(slug: string): Promise<News> {
    const response = await api(`/news/${slug}`, {
      cache: 'no-cache',
    })
    const result = await response.json()

    return result.news
  }

  async function fetchRecentNews(): Promise<News[]> {
    const response = await api('/news', {
      cache: 'no-cache',
    })
    const result = await response.json()

    return result.news
  }

  const news = await getNewsBySlug(params.slug)
  const recentNews = await fetchRecentNews()

  if (!news) {
    return (
      <div className="flex justify-center bg-zinc-850 py-10">
        <h1>Nenhuma notícia postada!</h1>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-news-content bg-zinc-850">
      <div className="z-1 relative border-t border-zinc-600">
        {recentNews.map((value) => (
          <NewsItem
            key={value.id}
            title={value.title}
            url={`/news/${value.slug}`}
            authorName={value.author.username}
            createdAt={value.createdAt}
            isSelected={value.slug === params.slug}
          />
        ))}
      </div>
      <div className="z-2 relative border border-zinc-600">
        <NewsContent data={news} />
      </div>
    </div>
  )
}
