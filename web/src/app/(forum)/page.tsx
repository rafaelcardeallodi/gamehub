import { Forum } from '@/components/Forum'
import { Hero } from '@/components/Hero'
import { OnlineMembers } from '@/components/OnlineMembers'
import { RecentNews } from '@/components/RecentNews'

import { api } from '@/data/api'

export default async function Home() {
  async function fetchRecentTopics() {
    const response = await api('/topics', {
      cache: 'no-cache',
    })

    return response.json()
  }

  const recentTopics = await fetchRecentTopics()

  return (
    <div>
      <Hero />

      <div className="mt-14 grid grid-cols-forum-and-recent-posts gap-8">
        <Forum recentTopics={recentTopics} />

        <div className="flex w-full flex-col gap-4">
          <RecentNews />
        </div>
      </div>
    </div>
  )
}
