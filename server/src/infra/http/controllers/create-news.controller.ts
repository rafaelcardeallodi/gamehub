import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateNewsUseCase } from '@/domain/web/application/use-cases/create-news'
import { NewsPresenter } from '../presenters/news-presenter'

const createNewsBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createNewsBodySchema)

type CreateNewsBody = z.infer<typeof createNewsBodySchema>

@Controller('/news')
export class CreateNewsController {
  constructor(private createNews: CreateNewsUseCase) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateNewsBody,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    const result = await this.createNews.execute({
      authorId: userId,
      title,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const news = result.value.news

    return NewsPresenter.toHTTP(news)
  }
}
