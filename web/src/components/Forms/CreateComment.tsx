'use client'

import { z } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'

import { Button } from '../Button'
import { TiptapEditor } from '../TiptapEditor'

import { api } from '@/data/api'
import { useRouter } from 'next/navigation'

const createCommentSchema = z.object({
  content: z.string().min(1, {
    message: 'Digite o conteúdo do tópico',
  }),
})

type CreateCommentData = z.infer<typeof createCommentSchema>

interface CreateCommentProps {
  topicId: number
}

export function CreateComment({ topicId }: CreateCommentProps) {
  const { data: user } = useSession()
  const router = useRouter()

  const createCommentForm = useForm<CreateCommentData>({
    resolver: zodResolver(createCommentSchema),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = createCommentForm

  async function createComment(data: CreateCommentData) {
    const response = await api(`/topics/${topicId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      },
    })

    if (!response.ok) {
      const result = await response.json()
      return toast.error(result.message)
    }

    reset()
    toast.success('Tópico criado com sucesso!')
    router.refresh()
  }

  if (!topicId) {
    return
  }

  return (
    <FormProvider {...createCommentForm}>
      <form
        onSubmit={handleSubmit(createComment)}
        className="border border-zinc-700 bg-zinc-900"
      >
        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TiptapEditor
              onChange={onChange}
              content={value}
              className="min-h-[232px]"
            />
          )}
        />

        <div className="p-4">
          <Button className="h-8 w-full" loading={isSubmitting}>
            Enviar comentário
          </Button>
        </div>
      </form>

      <ToastContainer />
    </FormProvider>
  )
}
