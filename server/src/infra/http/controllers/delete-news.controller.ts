import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { DeleteNewsUseCase } from '@/domain/web/application/use-cases/delete-news'

@Controller('/news/:id')
export class DeleteNewsController {
  constructor(private deleteNews: DeleteNewsUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    const userId = user.sub

    const result = await this.deleteNews.execute({
      newsId: Number(id),
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
