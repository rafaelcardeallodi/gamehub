import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { UserFactory } from 'test/factories/make-user'
import { NewsFactory } from 'test/factories/make-news'

import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch Recent News (E2E)', () => {
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

  test('[GET] /news', async () => {
    const user = await userFactory.makePrismaUser()

    await Promise.all([
      newsFactory.makePrismaNews({
        title: 'News 1',
        authorId: user.id,
      }),
      newsFactory.makePrismaNews({
        title: 'News 2',
        authorId: user.id,
      }),
    ])

    const response = await request(app.getHttpServer()).get('/news').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      news: expect.arrayContaining([
        expect.objectContaining({ title: 'News 2' }),
        expect.objectContaining({ title: 'News 1' }),
      ]),
    })
  })
})
