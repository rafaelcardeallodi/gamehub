import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Topic, TopicProps } from '@/domain/web/enterprise/entities/topic'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaTopicMapper } from '@/infra/database/prisma/mappers/prisma-topic-mapper'
import { Injectable } from '@nestjs/common'

export function makeTopic(
  override: Partial<TopicProps> = {},
  id?: UniqueEntityID,
) {
  const topic = Topic.create(
    {
      authorId: new UniqueEntityID(1),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return topic
}

@Injectable()
export class TopicFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaTopic(data: Partial<TopicProps> = {}): Promise<Topic> {
    const topic = makeTopic(data)

    await this.prisma.topic.create({
      data: PrismaTopicMapper.toPrisma(topic),
    })

    return topic
  }
}
