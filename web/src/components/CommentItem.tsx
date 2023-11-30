import { Comment } from '@/app/(forum)/topics/[slug]/page'
import { Calendar, User } from 'lucide-react'

interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  const commentDateFormatted = new Date(comment.createdAt).toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    },
  )

  const commentAuthorDateFormatted = new Date(
    comment.author.createdAt,
  ).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="grid grid-cols-topic-view border border-zinc-700 bg-zinc-800">
      <div className="space-y-7 p-8">
        <time className="opacity-60">{commentDateFormatted}</time>

        <div
          className="prose prose-invert max-w-none prose-headings:font-medium prose-headings:text-zinc-100 prose-h1:text-2xl prose-p:text-zinc-200"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />
      </div>

      <div className="flex flex-col gap-2 border-l border-zinc-700 bg-zinc-850 p-10">
        <div className="flex h-[200px] w-[200px] items-center justify-center bg-blue-500">
          <User size={120} />
        </div>

        <div className="space-y-2">
          <span className="flex justify-center gap-2">
            <User />
            {comment.author.username}
          </span>

          <time className="flex justify-center gap-2">
            <Calendar />
            {commentAuthorDateFormatted}
          </time>
        </div>
      </div>
    </div>
  )
}
