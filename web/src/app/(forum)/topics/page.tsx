import { TopicsList } from '@/components/TopicsList'
import { api } from '@/data/api'

export default async function Topics() {
  async function fetchRecentTopics() {
    const response = await api('/topics', {
      cache: 'no-cache',
    })

    return response.json()
  }

  const recentTopics = await fetchRecentTopics()

  return (
    <div className="border border-zinc-700 bg-zinc-850 pb-6">
      <h1 className="border-b border-zinc-700 p-8 text-2xl font-medium">
        Tópicos recentes
      </h1>

      <TopicsList recentTopics={recentTopics} />
    </div>
  )
}
