import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from '@/infra/database/database.module'
import { NewsFactory } from 'test/factories/make-news'
import { Slug } from '@/domain/web/enterprise/entities/value-objects/slug'

describe('Get News By Slug (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let newsFactory: NewsFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, NewsFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)
    newsFactory = moduleRef.get(NewsFactory)

    await app.init()
  })

  test('[GET] /news/:slug', async () => {
    const user = await userFactory.makePrismaUser({
      username: 'John Doe',
    })

    await newsFactory.makePrismaNews({
      title: 'News 1',
      slug: Slug.create('news-1'),
      authorId: user.id,
    })

    const response = await request(app.getHttpServer())
      .get('/news/news-1')
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      news: expect.objectContaining({
        title: 'News 1',
        author: expect.objectContaining({ username: 'John Doe' }),
      }),
    })
  })
})
