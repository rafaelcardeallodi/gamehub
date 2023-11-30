'use client'

import { ReactNode, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'

import { TextField } from '../TextField'
import { Button } from '../Button'
import { api } from '@/data/api'

import 'react-toastify/dist/ReactToastify.css'

const createUserSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: 'O nome de usuário é obrigatório',
    })
    .max(20, {
      message: 'O nome de usuário não pode ter mais de 20 caracteres',
    })
    .refine(
      (value) => !value.includes(' '),
      'O nome de usuário não pode conter espaços',
    ),
  email: z
    .string()
    .min(1, {
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Formato de e-mail inválido',
    })
    .toLowerCase(),
  password: z.string().min(6, {
    message: 'A senha precisa ter no mínimo 6 caracteres',
  }),
})

type CreateUserData = z.infer<typeof createUserSchema>

interface CreateAccountModalProps {
  children: ReactNode
}

export function CreateAccountModal({ children }: CreateAccountModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = createUserForm

  async function createUser(data: CreateUserData) {
    const response = await api('/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const result = await response.json()

      return toast.error(result.message)
    }

    toast.success('Conta criada com sucesso!')

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
              Crie sua conta
            </Dialog.Title>

            <FormProvider {...createUserForm}>
              <form
                onSubmit={handleSubmit(createUser)}
                className="mt-4 flex flex-col gap-3"
              >
                <TextField
                  labelText="Nome de usuário"
                  name="username"
                  errorMessage={errors.username?.message}
                />
                <TextField
                  labelText="E-mail"
                  name="email"
                  type="email"
                  errorMessage={errors.email?.message}
                />
                <TextField
                  labelText="Senha"
                  name="password"
                  type="password"
                  errorMessage={errors.password?.message}
                />

                <Button className="mt-4 h-12" loading={isSubmitting}>
                  Cadastrar
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
