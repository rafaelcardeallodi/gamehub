import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { UserFactory } from 'test/factories/make-user'
import { TopicFactory } from 'test/factories/make-topic'

import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch Recent Topic (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let topicFactory: TopicFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, TopicFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)

    await app.init()
  })

  test('[GET] /topics', async () => {
    const user = await userFactory.makePrismaUser()

    await Promise.all([
      topicFactory.makePrismaTopic({
        title: 'Topic 1',
        authorId: user.id,
      }),
      topicFactory.makePrismaTopic({
        title: 'Topic 2',
        authorId: user.id,
      }),
    ])

    const response = await request(app.getHttpServer()).get('/topics').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      topics: expect.arrayContaining([
        expect.objectContaining({ title: 'Topic 2' }),
        expect.objectContaining({ title: 'Topic 1' }),
      ]),
      totalCount: 2,
    })
  })
})
