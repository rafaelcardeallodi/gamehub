import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from '../../database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '@/infra/database/database.module'
import { UserFactory } from 'test/factories/make-user'
import { NewsFactory } from 'test/factories/make-news'

describe('Edit News (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let newsFactory: NewsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, NewsFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    newsFactory = moduleRef.get(NewsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /news/:id', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({
      sub: user.id.toValue(),
    })

    const news = await newsFactory.makePrismaNews({
      authorId: user.id,
    })

    const newsId = news.id.toValue()

    const response = await request(app.getHttpServer())
      .put(`/news/${newsId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Edit news',
        content: 'Edit content',
      })

    expect(response.statusCode).toBe(204)

    const newsOnDatabase = await prisma.news.findFirst({
      where: {
        title: 'Edit news',
        content: 'Edit content',
      },
    })

    expect(newsOnDatabase).toBeTruthy()
  })
})
