'use client'

import { useSession } from 'next-auth/react'

import { Button } from './Button'
import { Logo } from './Logo'
import { Slide } from './Slide'
import { CreateAccountModal } from './Modals/CreateAccountModal'

export function Hero() {
  const { data } = useSession()

  return (
    <div className="grid h-[368px] grid-cols-hero">
      <div className="flex flex-col items-start justify-between bg-zinc-800 bg-gradient-hero p-8">
        <Logo />

        <div className="flex-1">
          <h2 className="mt-8 text-base/5 font-medium">
            Conheça o fórum de games mais completo do Brasil!
          </h2>

          <p className="mt-6 max-w-[294px] text-sm opacity-70">
            Cansado de perder a data do lançamento do jogo novo da sua franquia
            favorita? Ou de não conseguir encontrar jogadores naquele jogo que
            você tanto gosta? com a GAMEHUB tudo isso pode ser resolvido de
            forma fácil!
          </p>
        </div>

        {!data && (
          <CreateAccountModal>
            <Button className="h-10">Faça parte</Button>
          </CreateAccountModal>
        )}
      </div>

      <Slide />
    </div>
  )
}
