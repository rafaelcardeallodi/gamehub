import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Avatar } from './Avatar'

import { Button } from '@/components/Button'
import { SignInModal } from '@/components/Modals/SignInModal'
import { CreateAccountModal } from './Modals/CreateAccountModal'
import { getServerSession } from 'next-auth'

import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { ButtonSignOut } from './ButtonSignOut'

export async function UserArea() {
  const session = await getServerSession(nextAuthOptions)

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Avatar />

        <div>
          <span>Olá, {session.user.username}</span>
          <div className="flex gap-3">
            <Link href="/topics/create" className="hover:underline">
              Postar tópico
            </Link>

            <ButtonSignOut />
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
