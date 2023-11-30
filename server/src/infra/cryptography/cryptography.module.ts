import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/web/application/cryptography/encrypter'
import { HashComparer } from '@/domain/web/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/web/application/cryptography/hash-generator'

import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
