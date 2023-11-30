import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { DeleteTopicUseCase } from '@/domain/web/application/use-cases/delete-topic'

@Controller('/topics/:id')
export class DeleteTopicController {
  constructor(private deleteTopic: DeleteTopicUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    const userId = user.sub

    const result = await this.deleteTopic.execute({
      topicId: Number(id),
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
