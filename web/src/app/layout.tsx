import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

import './globals.css'

const kanit = Kanit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GAMEHUB',
  description: 'Seu game favorito em um só lugar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className="antialiased">
      <body className={kanit.className}>{children}</body>
    </html>
  )
}
