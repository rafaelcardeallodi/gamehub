import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface GetUserByIdUseCaseRequest {
  userId: number
}

type GetUserByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>
@Injectable()
export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    userId,
  }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({
      user,
    })
  }
}
