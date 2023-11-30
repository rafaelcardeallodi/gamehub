import { Navigation } from './Navigation'
import { UserArea } from './UserArea'

export function Header() {
  return (
    <header className="flex h-16 w-full bg-zinc-800 px-8 shadow-header">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4">
        <Navigation />

        <UserArea />
      </div>
    </header>
  )
}
