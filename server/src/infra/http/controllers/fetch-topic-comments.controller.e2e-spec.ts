import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { UserFactory } from 'test/factories/make-user'
import { TopicFactory } from 'test/factories/make-topic'

import { DatabaseModule } from '@/infra/database/database.module'
import { TopicCommentFactory } from 'test/factories/make-topic-comment'

describe('Fetch Topic Comments (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let topicFactory: TopicFactory
  let topicCommentFactory: TopicCommentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, TopicFactory, TopicCommentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)
    topicFactory = moduleRef.get(TopicFactory)
    topicCommentFactory = moduleRef.get(TopicCommentFactory)

    await app.init()
  })

  test('[GET] /topics/:topicId/comments', async () => {
    const user = await userFactory.makePrismaUser({
      username: 'John Doe',
    })

    const topic = await topicFactory.makePrismaTopic({
      title: 'Topic 1',
      authorId: user.id,
    })

    const topicId = topic.id.toValue()

    await Promise.all([
      topicCommentFactory.makePrismaTopicComment({
        content: 'Comment 1',
        topicId: topic.id,
        authorId: user.id,
      }),
      topicCommentFactory.makePrismaTopicComment({
        content: 'Comment 2',
        topicId: topic.id,
        authorId: user.id,
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/topics/${topicId}/comments`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({
          content: 'Comment 1',
          author: expect.objectContaining({ username: 'John Doe' }),
        }),
        expect.objectContaining({
          content: 'Comment 2',
          author: expect.objectContaining({ username: 'John Doe' }),
        }),
      ]),
    })
  })
})
