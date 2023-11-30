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

const createNewsSchema = z.object({
  title: z.string().min(1, {
    message: 'Digite um título para o tópico',
  }),
  content: z.string().min(1, {
    message: 'Digite o conteúdo do tópico',
  }),
})

type CreateNewsData = z.infer<typeof createNewsSchema>

export function CreateNewsForm() {
  const { data: user } = useSession()
  const router = useRouter()

  const createNewsForm = useForm<CreateNewsData>({
    resolver: zodResolver(createNewsSchema),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = createNewsForm

  async function createNews(data: CreateNewsData) {
    const response = await api('/news', {
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

    toast.success('Notícia criada com sucesso!')
    router.push(`/news/${result.slug}`)
    reset()
  }

  return (
    <FormProvider {...createNewsForm}>
      <form onSubmit={handleSubmit(createNews)}>
        <TextField
          name="title"
          labelText="Título da notícia:"
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
