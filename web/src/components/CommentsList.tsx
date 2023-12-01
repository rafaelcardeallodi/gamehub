'use client'

import { Accordion } from './Accordion'
import { CommentItem } from './CommentItem'
import { Comment } from '@/app/(forum)/topics/[slug]/page'
import { useState } from 'react'
import { Pagination } from './Pagination'

interface CommentsListProps {
  comments: Comment[]
  totalComments: number
}

export function CommentsList({ comments, totalComments }: CommentsListProps) {
  const [page, setPage] = useState<number>(1)

  return (
    <Accordion title="Comentários" value="item-1" collapsible>
      {comments.length > 0 ? (
        <>
          <div className="flex flex-col gap-8">
            {comments?.map((comment) => {
              return <CommentItem key={comment.commentId} comment={comment} />
            })}
          </div>

          {totalComments > 10 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={page}
                totalCountOfRegisters={totalComments}
                onPageChange={setPage}
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
