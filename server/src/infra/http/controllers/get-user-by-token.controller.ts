import { BadRequestException, Controller, HttpCode, Get } from '@nestjs/common'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { GetUserByIdUseCase } from '@/domain/web/application/use-cases/get-user-by-id'
import { UserPresenter } from '../presenters/user-presenter'

@Controller('/me')
export class GetUserByTokenController {
  constructor(private getUserById: GetUserByIdUseCase) { }

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    const result = await this.getUserById.execute({
      userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { user: UserPresenter.toHTTP(result.value.user) }
  }
}
