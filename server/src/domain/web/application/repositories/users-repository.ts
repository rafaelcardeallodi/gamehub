import { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
  abstract findById(id: number): Promise<User | null>
  abstract findByName(username: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(user: User): Promise<void>
}
