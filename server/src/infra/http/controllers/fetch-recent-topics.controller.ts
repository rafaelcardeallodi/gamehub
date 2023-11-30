import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchRecentTopicsUseCase } from '@/domain/web/application/use-cases/fetch-recent-topics'
import { TopicPresenter } from '../presenters/topic-presenter'
import { Public } from '@/infra/auth/public'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParam = z.infer<typeof pageQueryParamSchema>

@Controller('/topics')
@Public()
export class FetchRecentTopicsController {
  constructor(private fetchRecentTopics: FetchRecentTopicsUseCase) { }

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParam) {
    const result = await this.fetchRecentTopics.execute({ page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const topics = result.value.topics
    const totalCount = result.value.totalCount

    return {
      topics: topics.map(TopicPresenter.toHTTP),
      totalCount,
    }
  }
}
