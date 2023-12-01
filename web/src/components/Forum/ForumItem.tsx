import Link from 'next/link'
import { MessagesSquare } from 'lucide-react'

interface ForumItemProps {
  title: string
  description: string
  url: string
}

export function ForumItem({ title, description, url }: ForumItemProps) {
  return (
    <Link
      href={url}
      className="group relative flex w-full cursor-pointer items-center gap-4 bg-zinc-800 px-4 py-3 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-blue-500 before:content-[''] hover:bg-zinc-700"
    >
      <span className="flex h-10 w-10 items-center justify-center bg-zinc-700 group-hover:bg-zinc-600">
        <MessagesSquare />
      </span>

      <div className="flex-1">
        <h3 className="line-clamp-1 text-base font-medium">{title}</h3>
        <p className="line-clamp-1 text-[0.8125rem] opacity-60">
          {description}
        </p>
      </div>
    </Link>
  )
}
