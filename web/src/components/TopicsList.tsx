'use client'

import { api } from '@/data/api'
import { useState } from 'react'
import { Avatar } from './Avatar'
import { Pagination } from './Pagination'
import Link from 'next/link'

export interface Topic {
  id: string
  title: string
  excerpt: string
  slug: string
}

interface TopicsListProps {
  recentTopics: {
    topics: Topic[]
    totalCount: number
  }
}
export function TopicsList({ recentTopics }: TopicsListProps) {
  const [topics, setTopics] = useState<Topic[]>(recentTopics.topics)
  const [page, setPage] = useState<number>(1)

  async function fetchTopics(page: number) {
    const response = await api(`/topics?page=${page}`)

    const data = await response.json()

    setTopics(data.topics)
  }

  return (
    <>
      <div className="divide-y divide-zinc-700">
        {topics.map((topic) => (
          <div key={topic.id} className="flex items-center gap-5 px-6 py-5">
            <Avatar size={48} isRounded={false} />

            <div className="flex flex-col gap-2">
              <Link
                href={`/topics/${topic.slug}`}
                className="font-medium hover:underline"
              >
                {topic.title}
              </Link>
              <p className="text-sm opacity-60">{topic.excerpt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-9 px-6">
        <Pagination
          currentPage={page}
          totalCountOfRegisters={recentTopics.totalCount}
          onPageChange={(page) => {
            fetchTopics(page)
            setPage(page)
          }}
        />
      </div>
    </>
  )
}
