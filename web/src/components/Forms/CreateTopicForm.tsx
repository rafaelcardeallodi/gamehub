'use client'

import { FormProvider, useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { TextField } from '../TextField'
import { TiptapEditor } from '../TiptapEditor'
import { Button } from '../Button'

import { api } from '@/data/api'

const createTopicSchema = z.object({
  title: z.string().min(1, {
    message: 'Digite um título para o tópico',
  }),
  content: z.string().min(1, {
    message: 'Digite o conteúdo do tópico',
  }),
})

type CreateTopicData = z.infer<typeof createTopicSchema>

export function CreateTopicForm() {
  const { data: user } = useSession()
  const router = useRouter()

  const createTopicForm = useForm<CreateTopicData>({
    resolver: zodResolver(createTopicSchema),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = createTopicForm

  async function createTopic(data: CreateTopicData) {
    const response = await api('/topics', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return toast.error(result.message)
    }

    toast.success('Tópico criado com sucesso!')
    router.push(`/topics/${result.slug}`)
    reset()
  }

  return (
    <FormProvider {...createTopicForm}>
      <form onSubmit={handleSubmit(createTopic)}>
        <TextField
          name="title"
          labelText="Título do tópico:"
          errorMessage={errors.title?.message}
        />

        <div className="mt-2">
          <p className="text-white/80">Conteúdo:</p>
          <div className="mt-2">
            <Controller
              name="content"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TiptapEditor onChange={onChange} content={value} />
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mt-5 h-12 w-full"
          loading={isSubmitting}
        >
          Postar
        </Button>
      </form>

      <ToastContainer />
    </FormProvider>
  )
}
