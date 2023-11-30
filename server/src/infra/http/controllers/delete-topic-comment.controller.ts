import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { DeleteTopicCommentUseCase } from '@/domain/web/application/use-cases/delete-topic-comment'

@Controller('/topics/comments/:id')
export class DeleteTopicCommentController {
  constructor(private deleteTopicComment: DeleteTopicCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    const userId = user.sub

    const result = await this.deleteTopicComment.execute({
      topicCommentId: Number(id),
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
