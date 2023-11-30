import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateTopicUseCase } from '@/domain/web/application/use-cases/create-topic'

const createTopicBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createTopicBodySchema)

type CreateTopicBody = z.infer<typeof createTopicBodySchema>

@Controller('/topics')
export class CreateTopicController {
  constructor(private createTopic: CreateTopicUseCase) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateTopicBody,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    const result = await this.createTopic.execute({
      authorId: userId,
      title,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      slug: result.value.topic.slug.value,
    }
  }
}
