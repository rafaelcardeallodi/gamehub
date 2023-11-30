'use client'

import { ReactNode, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

import { TextField } from '../TextField'
import { Button } from '../Button'

import 'react-toastify/dist/ReactToastify.css'

const signInSchema = z.object({
  username: z.string().min(1, {
    message: 'Digite seu nome de usuário',
  }),
  password: z.string().min(6, {
    message: 'A senha precisa ter no mínimo 6 caracteres',
  }),
})

type SignInData = z.infer<typeof signInSchema>

interface SignInModalProps {
  children: ReactNode
}

export function SignInModal({ children }: SignInModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = signInForm

  async function login(data: SignInData) {
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      toast.error('Usuário ou senha incorretos')
      return
    }

    toast.success('Usuário logado com sucesso!')
    setIsModalOpen(false)
    reset()
  }

  return (
    <>
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-zinc-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 border-b border-zinc-700 pb-4 text-lg font-medium text-white/80">
              Entrar na sua conta
            </Dialog.Title>

            <FormProvider {...signInForm}>
              <form
                onSubmit={handleSubmit(login)}
                className="mt-4 flex flex-col gap-3"
              >
                <TextField
                  labelText="Nome de usuário"
                  name="username"
                  errorMessage={errors.username?.message}
                />
                <TextField
                  labelText="Senha"
                  name="password"
                  type="password"
                  errorMessage={errors.password?.message}
                />

                <Button className="mt-4 h-12" loading={isSubmitting}>
                  Entrar
                </Button>
              </form>
            </FormProvider>

            <Dialog.Close asChild>
              <button
                className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-blue-500 hover:bg-blue-400/40 focus:shadow-[0_0_0_2px] focus:shadow-blue-400 focus:outline-none"
                aria-label="Close"
              >
                <X />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ToastContainer />
    </>
  )
}
