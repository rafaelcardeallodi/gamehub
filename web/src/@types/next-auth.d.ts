import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    access_token: string
    user: {
      id: number
      username: string
      email: string
      role: 'USER' | 'ADMIN'
    }
  }
}
