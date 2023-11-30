import { UsersRepository } from '@/domain/web/application/repositories/users-repository'
import { User } from '@/domain/web/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: number) {
    const user = this.items.find((item) => item.id.toValue() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByName(username: string) {
    const user = this.items.find((item) => item.username === username)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User) {
    this.items.push(user)
  }
}
