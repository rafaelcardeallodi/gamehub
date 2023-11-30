import { CreateTopicForm } from '@/components/Forms/CreateTopicForm'

export default function CreateTopic() {
  return (
    <div>
      <h2 className="text-3xl text-blue-400">Postar tópico</h2>

      <div className="mt-6 w-full bg-zinc-800 px-8 py-6">
        <CreateTopicForm />
      </div>
    </div>
  )
}
