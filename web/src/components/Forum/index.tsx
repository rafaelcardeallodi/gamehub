'use client'
import { useState } from 'react'

import { Accordion } from '../Accordion'
import { ForumItem } from './ForumItem'

import { api } from '@/data/api'
import { Pagination } from '../Pagination'

export interface Topic {
  id: string
  title: string
  excerpt: string
  slug: string
}

interface ForumProps {
  recentTopics: {
    topics: Topic[]
    totalCount: number
  }
}

export function Forum({ recentTopics }: ForumProps) {
  const [topics, setTopics] = useState<Topic[]>(recentTopics.topics)
  const [page, setPage] = useState<number>(1)

  async function fetchTopics(page: number) {
    const response = await api(`/topics?page=${page}`, {
      cache: 'no-cache',
    })

    const data = await response.json()

    setTopics(data.topics)
  }

  return (
    <Accordion
      title="Discussões Gerais"
      value="item-1"
      className="flex flex-col gap-2"
    >
      {topics.map((topic) => (
        <ForumItem
          key={topic.id}
          title={topic.title}
          description={topic.excerpt}
          url={`/topics/${topic.slug}`}
        />
      ))}

      <Pagination
        currentPage={page}
        totalCountOfRegisters={recentTopics.totalCount}
        onPageChange={(page) => {
          fetchTopics(page)
          setPage(page)
        }}
      />
    </Accordion>
  )
}
