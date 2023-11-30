import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { PrismaTopicsRepository } from './prisma/repositories/prisma-topics-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { PrismaNewsRepository } from './prisma/repositories/prisma-news-repository'
import { PrismaTopicCommentsRepository } from './prisma/repositories/prisma-topic-comments-repository'
import { TopicsRepository } from '@/domain/web/application/repositories/topics-repository'
import { UsersRepository } from '@/domain/web/application/repositories/users-repository'
import { NewsRepository } from '@/domain/web/application/repositories/news-repository'
import { TopicCommentsRepository } from '@/domain/web/application/repositories/topic-comments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: TopicsRepository,
      useClass: PrismaTopicsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: NewsRepository,
      useClass: PrismaNewsRepository,
    },
    {
      provide: TopicCommentsRepository,
      useClass: PrismaTopicCommentsRepository,
    },
  ],
  exports: [
    PrismaService,
    TopicsRepository,
    UsersRepository,
    NewsRepository,
    TopicCommentsRepository,
  ],
})
export class DatabaseModule { }
