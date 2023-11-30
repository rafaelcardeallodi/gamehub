import { CreateNewsUseCase } from './create-news'
import { InMemoryNewsRepository } from 'test/repositories/in-memory-news-repository'

let inMemoryNewsRepository: InMemoryNewsRepository
let sut: CreateNewsUseCase

describe('Create News', () => {
  beforeEach(() => {
    inMemoryNewsRepository = new InMemoryNewsRepository()
    sut = new CreateNewsUseCase(inMemoryNewsRepository)
  })

  it('should be able to create a news', async () => {
    const result = await sut.execute({
      authorId: 1,
      title: 'Novo tópico',
      content: 'Conteúdo do tópico',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNewsRepository.items[0]).toEqual(result.value?.news)
  })
})
