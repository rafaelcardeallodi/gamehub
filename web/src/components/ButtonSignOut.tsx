'use client'

import { signOut } from 'next-auth/react'

export function ButtonSignOut() {
  async function handleLogout() {
    await signOut()
  }

  return (
    <button
      onClick={handleLogout}
      className="hover:text-red-400 hover:underline"
    >
      Sair
    </button>
  )
}
