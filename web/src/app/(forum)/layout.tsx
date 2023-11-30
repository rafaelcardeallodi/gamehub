import { ReactNode } from 'react'

import { Header } from '@/components/Header'

import SessionProvider from '../../providers/SessionProvider'

export default function ForumLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div>
        <Header />

        <main className="mt-14 px-8">
          <div className="mx-auto flex max-w-screen-xl flex-col">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  )
}
