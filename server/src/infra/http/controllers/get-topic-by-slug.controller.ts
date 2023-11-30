import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { GetTopicBySlugUseCase } from '@/domain/web/application/use-cases/get-topic-by-slug'
import { Public } from '@/infra/auth/public'
import { TopicDetailsPresenter } from '../presenters/topic-details-presenter'

@Controller('/topics/:slug')
@Public()
export class GetTopicBySlugController {
  constructor(private getTopicBySlug: GetTopicBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getTopicBySlug.execute({ slug })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const topic = result.value.topic

    return { topic: TopicDetailsPresenter.toHTTP(topic) }
  }
}
