import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from '../../database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '@/infra/database/database.module'
import { UserFactory } from 'test/factories/make-user'
import { TopicFactory } from 'test/factories/make-topic'
import { TopicCommentFactory } from 'test/factories/make-topic-comment'

describe('Delete Topic Comment (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let topicCommentFactory: TopicCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, TopicFactory, TopicCommentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    topicCommentFactory = moduleRef.get(TopicCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /topics/comments/:id', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({
      sub: user.id.toValue(),
    })

    const topic = await topicFactory.makePrismaTopic({
      authorId: user.id,
    })

    const topicComment = await topicCommentFactory.makePrismaTopicComment({
      authorId: user.id,
      topicId: topic.id,
    })

    const topicCommentId = topicComment.id.toValue()

    const response = await request(app.getHttpServer())
      .delete(`/topics/comments/${topicCommentId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const topicCommentOnDatabase = await prisma.comment.findUnique({
      where: {
        id: topicCommentId,
      },
    })

    expect(topicCommentOnDatabase).toBeNull()
  })
})
