import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="flex items-center gap-10 text-white">
      <Link
        href="/"
        className="p-2 uppercase transition-colors hover:bg-zinc-900"
      >
        Início
      </Link>
      <Link
        href="/topics"
        className="p-2 uppercase transition-colors hover:bg-zinc-900"
      >
        Discussões
      </Link>
      <Link
        href="/news"
        className="p-2 uppercase transition-colors hover:bg-zinc-900"
      >
        Notícias
      </Link>
    </nav>
  )
}
