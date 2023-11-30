import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { EditTopicUseCase } from '@/domain/web/application/use-cases/edit-topic'

const editTopicBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editTopicBodySchema)

type EditTopicBody = z.infer<typeof editTopicBodySchema>

@Controller('/topics/:id')
export class EditTopicController {
  constructor(private editTopic: EditTopicUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditTopicBody,
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
  ) {
    const { title, content } = body
    const userId = user.sub

    const result = await this.editTopic.execute({
      topicId: Number(id),
      authorId: userId,
      title,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
