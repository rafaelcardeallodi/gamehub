import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from '../../database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '@/infra/database/database.module'
import { UserFactory } from 'test/factories/make-user'
import { TopicFactory } from 'test/factories/make-topic'

describe('Comment on Topic (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, TopicFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /topics/:topicId/comments', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({
      sub: user.id.toValue(),
    })

    const topic = await topicFactory.makePrismaTopic({
      authorId: user.id,
    })

    const topicId = topic.id.toValue()

    const response = await request(app.getHttpServer())
      .post(`/topics/${topicId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'Topic content',
      })

    expect(response.statusCode).toBe(201)

    const topicCommentOnDatabase = await prisma.comment.findFirst({
      where: {
        content: 'Topic content',
        parentId: topicId,
        parentType: 'TOPIC',
      },
    })

    expect(topicCommentOnDatabase).toBeTruthy()
  })
})
