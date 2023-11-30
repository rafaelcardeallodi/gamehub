import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CommentOnTopicUseCase } from '@/domain/web/application/use-cases/comment-on-topic'

const commentOnTopicBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentOnTopicBodySchema)

type CommentOnTopicBody = z.infer<typeof commentOnTopicBodySchema>

@Controller('/topics/:topicId/comments')
export class CommentOnTopicController {
  constructor(private commentOnTopic: CommentOnTopicUseCase) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentOnTopicBody,
    @CurrentUser() user: UserPayload,
    @Param('topicId') topicId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentOnTopic.execute({
      authorId: userId,
      topicId: Number(topicId),
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
