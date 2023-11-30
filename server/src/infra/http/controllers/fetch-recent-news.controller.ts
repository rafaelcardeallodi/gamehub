import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchRecentNewsUseCase } from '@/domain/web/application/use-cases/fetch-recent-news'
import { NewsPresenter } from '../presenters/news-presenter'
import { Public } from '@/infra/auth/public'
import { NewsDetailsPresenter } from '../presenters/news-details-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParam = z.infer<typeof pageQueryParamSchema>

@Controller('/news')
@Public()
export class FetchRecentNewsController {
  constructor(private fetchRecentNews: FetchRecentNewsUseCase) { }

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParam) {
    const result = await this.fetchRecentNews.execute({ page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const news = result.value.news

    return { news: news.map(NewsDetailsPresenter.toHTTP) }
  }
}
