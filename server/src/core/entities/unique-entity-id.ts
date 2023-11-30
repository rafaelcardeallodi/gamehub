import { randomInt } from 'node:crypto'

export class UniqueEntityID {
  private value: number

  toValue() {
    return this.value
  }

  constructor(value?: number) {
    this.value = value ?? randomInt(1, 100)
  }

  public equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
