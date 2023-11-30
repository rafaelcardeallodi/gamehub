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
import { EditNewsUseCase } from '@/domain/web/application/use-cases/edit-news'

const editNewsBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editNewsBodySchema)

type EditNewsBody = z.infer<typeof editNewsBodySchema>

@Controller('/news/:id')
export class EditNewsController {
  constructor(private editNews: EditNewsUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditNewsBody,
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
  ) {
    const { title, content } = body
    const userId = user.sub

    const result = await this.editNews.execute({
      newsId: Number(id),
      authorId: userId,
      title,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
