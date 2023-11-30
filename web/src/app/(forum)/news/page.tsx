import { NewsContent } from '@/components/News/NewsContent'
import { NewsItem } from '@/components/News/NewsItem'
import { News } from './[slug]/page'
import { api } from '@/data/api'
import { Button } from '@/components/Button'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function News() {
  const sessions = await getServerSession(nextAuthOptions)

  async function fetchRecentNews(): Promise<News[]> {
    const response = await api('/news', {
      cache: 'no-cache',
    })
    const result = await response.json()

    return result.news
  }

  const recentNews = await fetchRecentNews()

  if (recentNews.length === 0) {
    return (
      <div className="flex justify-center bg-zinc-850 py-10">
        <h1>Nenhuma notícia postada!</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-end">
      {sessions && sessions.user.role === 'ADMIN' && (
        <Link
          href="/news/create"
          className="mb-4 flex h-8 items-center justify-center bg-blue-500 px-2.5 font-semibold uppercase text-white transition-colors hover:bg-blue-600"
        >
          Criar notícia
        </Link>
      )}

      <div className="grid grid-cols-news-content bg-zinc-850">
        <div className="z-1 relative border-t border-zinc-600">
          {recentNews.map((value) => (
            <NewsItem
              key={value.id}
              title={value.title}
              url={`/news/${value.slug}`}
              authorName={value.author.username}
              createdAt={value.createdAt}
              isSelected={value.slug === recentNews[0].slug}
            />
          ))}
        </div>
        <div className="z-2 relative border border-zinc-600">
          <NewsContent data={recentNews[0]} />
        </div>
      </div>
    </div>
  )
}
