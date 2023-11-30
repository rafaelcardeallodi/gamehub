import { getServerSession } from 'next-auth'

import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { CreateComment } from '@/components/Forms/CreateComment'
import { TopicContent } from '@/components/TopicContent'
import { CommentsList } from '@/components/CommentsList'
import { api } from '@/data/api'

export interface Topic {
  id: number
  title: string
  content: string
  slug: string
  author: {
    id: number
    username: string
    createdAt: string
  }
  createdAt: string
  updatedAt: string
}

export interface Comment {
  commentId: number
  content: string
  author: {
    id: number
    username: string
    createdAt: string
  }
  createdAt: string
  updatedAt: string
}

interface TopicsProps {
  params: {
    slug: string
  }
}

export default async function Topics({ params }: TopicsProps) {
  const session = await getServerSession(nextAuthOptions)

  async function getTopicBySlug(slug: string): Promise<Topic> {
    const response = await api(`/topics/${slug}`, {
      cache: 'no-cache',
    })
    const result = await response.json()

    return result.topic
  }

  async function fetchTopicComments(topicId: number): Promise<{
    comments: Comment[]
    totalCount: number
  }> {
    const response = await api(`/topics/${topicId}/comments`)
    const result = await response.json()

    return result
  }

  const topic = await getTopicBySlug(params.slug)
  const { comments, totalCount } = await fetchTopicComments(topic.id)

  console.log(comments, totalCount)

  return (
    <div className="flex flex-col gap-8">
      <TopicContent topic={topic} />

      <CommentsList
        topicId={topic.id}
        comments={comments}
        totalComments={totalCount}
      />

      {session && <CreateComment topicId={topic.id} />}
    </div>
  )
}
