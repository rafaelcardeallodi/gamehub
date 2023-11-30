import { News } from '@/app/(forum)/news/[slug]/page'
import { api } from '@/data/api'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'

export async function RecentNews() {
  async function fetchRecentNews(): Promise<News[]> {
    const response = await api('/news', {
      cache: 'no-cache',
    })
    const result = await response.json()

    return result.news
  }

  const recentNews = await fetchRecentNews()

  return (
    <div className="bg-zinc-800">
      <div className="flex h-12 items-center border border-zinc-500/70 bg-zinc-700 px-6 font-medium shadow-md">
        Últimas notícias
      </div>

      {recentNews.length > 0 ? (
        <div className="divide-y divide-white/60 px-6">
          {recentNews.map((value) => {
            const publishedDateFormatted = format(
              new Date(value.createdAt),
              "dd/MM/yyyy 'às' HH:mm",
              {
                locale: ptBR,
              },
            )

            return (
              <div key={value.id} className="flex flex-col py-4">
                <Link
                  href={`/news/${value.slug}`}
                  className="line-clamp-3 text-[0.8125rem] text-blue-400/80 hover:underline"
                >
                  {value.title}
                </Link>
                <span className="text-xs opacity-60">
                  Por <b>{value.author.username}</b> - {publishedDateFormatted}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="px-6 py-4 text-xs opacity-80">Nenhuma notícia postada!</p>
      )}
    </div>
  )
}
