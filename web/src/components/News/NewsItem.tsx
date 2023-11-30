import clsx from 'clsx'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface NewsItemProps {
  title: string
  url: string
  authorName: string
  createdAt: string
  isSelected?: boolean
}

export function NewsItem({
  title,
  url,
  authorName,
  createdAt,
  isSelected,
}: NewsItemProps) {
  const publishedDateRelativeToNow = formatDistanceToNow(new Date(createdAt), {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <Link
      href={url}
      className={clsx(
        'relative flex flex-col gap-4 border-b border-b-zinc-600 px-6 py-5 transition-colors hover:bg-zinc-800',
        {
          "bg-zinc-800 shadow-news-item before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-blue-500 before:content-['']":
            isSelected,
        },
      )}
    >
      <h3 className="max-w-60 line-clamp-3 font-medium leading-5">{title}</h3>
      <span className="text-xs opacity-60">
        Por {authorName} - {publishedDateRelativeToNow}
      </span>
    </Link>
  )
}
