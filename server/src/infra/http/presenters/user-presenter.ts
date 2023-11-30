import { User } from '@/domain/web/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toValue(),
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }
  }
}
