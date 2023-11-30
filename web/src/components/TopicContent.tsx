import { Calendar, User } from 'lucide-react'
import { Logo } from './Logo'
import { Topic } from '@/app/(forum)/topics/[slug]/page'

interface TopicContentProps {
  topic: Topic
}

export function TopicContent({ topic }: TopicContentProps) {
  const topicDateFormatted = new Date(topic.createdAt).toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    },
  )

  const topicAuthorDateFormatted = new Date(
    topic.author.createdAt,
  ).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })

  return (
    <div>
      <div className="grid grid-cols-topic-view border border-zinc-700 bg-zinc-800">
        <div>
          <header className="flex flex-col gap-9 border-b border-zinc-700 p-8">
            <div className="flex justify-between">
              <Logo />

              <time>{topicDateFormatted}</time>
            </div>

            <h1 className="text-2xl font-medium">{topic.title}</h1>
          </header>

          <div
            className="prose prose-invert max-w-none p-8 prose-headings:font-medium prose-headings:text-zinc-100 prose-h1:text-2xl prose-p:text-zinc-200"
            dangerouslySetInnerHTML={{ __html: topic.content }}
          />
        </div>

        <div className="flex flex-col gap-2 border-l border-zinc-700 bg-zinc-850 p-10">
          <div className="flex h-[200px] w-[200px] items-center justify-center bg-blue-500">
            <User size={120} />
          </div>

          <div className="space-y-2">
            <span className="flex justify-center gap-2">
              <User />
              {topic.author.username}
            </span>

            <time className="flex justify-center gap-2">
              <Calendar />
              {topicAuthorDateFormatted}
            </time>
          </div>
        </div>
      </div>
    </div>
  )
}
