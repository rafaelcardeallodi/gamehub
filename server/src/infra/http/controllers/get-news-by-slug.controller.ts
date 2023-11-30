import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { GetNewsBySlugUseCase } from '@/domain/web/application/use-cases/get-news-by-slug'
import { Public } from '@/infra/auth/public'
import { NewsDetailsPresenter } from '../presenters/news-details-presenter'

@Controller('/news/:slug')
@Public()
export class GetNewsBySlugController {
  constructor(private getNewsBySlug: GetNewsBySlugUseCase) { }

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getNewsBySlug.execute({ slug })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const news = result.value.news

    return { news: NewsDetailsPresenter.toHTTP(news) }
  }
}
