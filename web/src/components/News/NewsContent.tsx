import { News } from '@/app/(forum)/news/[slug]/page'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface NewsContentProps {
  data: News
}

export function NewsContent({ data }: NewsContentProps) {
  const publishedDateFormatted = format(
    new Date(data.createdAt),
    "dd/MM/yyyy 'às' HH:mm",
    {
      locale: ptBR,
    },
  )

  return (
    <div className="h-full bg-zinc-800 px-12 py-10">
      <div className="flex flex-col gap-8">
        <h1 className="max-w-2xl text-3xl/9 font-medium drop-shadow-title-text">
          {data.title}
        </h1>
        <span className="text-sm font-normal opacity-80">
          Por {data.author.username} - {publishedDateFormatted}
        </span>
      </div>

      <div
        className="prose prose-invert mt-10 prose-headings:font-medium prose-headings:text-zinc-100 prose-h1:text-2xl prose-p:text-zinc-200"
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      />
    </div>
  )
}
