import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from '@/infra/database/database.module'
import { TopicFactory } from 'test/factories/make-topic'
import { Slug } from '@/domain/web/enterprise/entities/value-objects/slug'

describe('Get Topic By Slug (E2E)', () => {
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

  test('[GET] /topics/:slug', async () => {
    const user = await userFactory.makePrismaUser({
      username: 'John Doe',
    })

    await topicFactory.makePrismaTopic({
      title: 'Topic 1',
      slug: Slug.create('topic-1'),
      authorId: user.id,
    })

    const response = await request(app.getHttpServer())
      .get('/topics/topic-1')
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      topic: expect.objectContaining({
        title: 'Topic 1',
        author: expect.objectContaining({ username: 'John Doe' }),
      }),
    })
  })
})
