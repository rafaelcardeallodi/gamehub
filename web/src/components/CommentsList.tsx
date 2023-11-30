'use client'

import { api } from '@/data/api'
import { Accordion } from './Accordion'
import { CommentItem } from './CommentItem'
import { Comment } from '@/app/(forum)/topics/[slug]/page'
import { useState } from 'react'
import { Pagination } from './Pagination'

interface CommentsListProps {
  topicId: number
  comments: Comment[]
  totalComments: number
}

export function CommentsList({
  topicId,
  comments,
  totalComments,
}: CommentsListProps) {
  const [commentsData, setCommentsData] = useState<Comment[]>(comments)
  const [page, setPage] = useState<number>(1)

  async function fetchTopicComments(page: number) {
    const response = await api(`/topics/${topicId}/comments?page=${page}`)

    const data = await response.json()

    setCommentsData(data.comments)
  }

  return (
    <Accordion title="Comentários" value="item-1" collapsible>
      {comments.length > 0 ? (
        <>
          <div className="flex flex-col gap-8">
            {commentsData?.map((comment) => {
              return <CommentItem key={comment.commentId} comment={comment} />
            })}
          </div>

          {totalComments > 10 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={page}
                totalCountOfRegisters={totalComments}
                onPageChange={(page) => {
                  fetchTopicComments(page)
                  setPage(page)
                }}
              />
            </div>
          )}
        </>
      ) : (
        <div className="border border-zinc-700 bg-zinc-800 p-8">
          Nenhum registrado no momento! Seja o primeiro a registrar abaixo
          (esteja logado).
        </div>
      )}
    </Accordion>
  )
}
