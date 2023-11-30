'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { SignInModal } from '@/components/Modals/SignInModal'
import { CreateAccountModal } from './Modals/CreateAccountModal'
import { Avatar } from './Avatar'

export function UserArea() {
  const { data } = useSession()

  async function handleLogout() {
    await signOut()
  }

  if (data) {
    return (
      <div className="flex items-center gap-4">
        <Avatar />

        <div>
          <span>Olá, {data.user.username}</span>
          <div className="flex gap-3">
            <Link href="/topics/create" className="hover:underline">
              Postar tópico
            </Link>

            <button
              onClick={handleLogout}
              className="hover:text-red-400 hover:underline"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <SignInModal>
        <Button variant="secondary" className="hover:underline">
          Login
        </Button>
      </SignInModal>

      <CreateAccountModal>
        <Button>Criar conta</Button>
      </CreateAccountModal>
    </div>
  )
}
