import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Injectable } from '@nestjs/common'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

interface RegisterUserUseCaseRequest {
  username: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError | EmailAlreadyExistsError,
  {
    user: User
  }
>
@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) { }

  async execute({
    username,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameName = await this.usersRepository.findByName(username)

    if (userWithSameName) {
      return left(new UserAlreadyExistsError(username))
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new EmailAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      email,
      username,
      password: hashedPassword,
      role: 'USER',
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
