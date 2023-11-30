import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { CreateNewsForm } from '@/components/Forms/CreateNewsForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function CreateNews() {
  const sessions = await getServerSession(nextAuthOptions)

  if (sessions?.user.role !== 'ADMIN') {
    return redirect('/')
  }

  return (
    <div>
      <h2 className="text-3xl text-blue-400">Criar notícia</h2>

      <div className="mt-6 w-full bg-zinc-800 px-8 py-6">
        <CreateNewsForm />
      </div>
    </div>
  )
}
