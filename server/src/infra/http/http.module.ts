import { Module } from '@nestjs/common'

import { CreateAccountController } from './controllers/create-account.controller'
import { CreateTopicController } from './controllers/create-topic.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { FetchRecentTopicsController } from './controllers/fetch-recent-topics.controller'

import { DatabaseModule } from '../database/database.module'

import { CreateTopicUseCase } from '@/domain/web/application/use-cases/create-topic'
import { FetchRecentTopicsUseCase } from '@/domain/web/application/use-cases/fetch-recent-topics'
import { RegisterUserUseCase } from '@/domain/web/application/use-cases/register-user'
import { AuthenticateUserUseCase } from '@/domain/web/application/use-cases/authenticate-user'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetTopicBySlugController } from './controllers/get-topic-by-slug.controller'
import { GetTopicBySlugUseCase } from '@/domain/web/application/use-cases/get-topic-by-slug'
import { GetNewsBySlugController } from './controllers/get-news-by-slug.controller'
import { GetNewsBySlugUseCase } from '@/domain/web/application/use-cases/get-news-by-slug'
import { EditTopicController } from './controllers/edit-topic.controller'
import { EditTopicUseCase } from '@/domain/web/application/use-cases/edit-topic'
import { DeleteTopicController } from './controllers/delete-topic.controller'
import { DeleteTopicUseCase } from '@/domain/web/application/use-cases/delete-topic'
import { CreateNewsController } from './controllers/create-news.controller'
import { CreateNewsUseCase } from '@/domain/web/application/use-cases/create-news'
import { EditNewsController } from './controllers/edit-news.controller'
import { EditNewsUseCase } from '@/domain/web/application/use-cases/edit-news'
import { DeleteNewsUseCase } from '@/domain/web/application/use-cases/delete-news'
import { FetchRecentNewsController } from './controllers/fetch-recent-news.controller'
import { FetchRecentNewsUseCase } from '@/domain/web/application/use-cases/fetch-recent-news'
import { CommentOnTopicUseCase } from '@/domain/web/application/use-cases/comment-on-topic'
import { DeleteTopicCommentController } from './controllers/delete-topic-comment.controller'
import { DeleteTopicCommentUseCase } from '@/domain/web/application/use-cases/delete-topic-comment'
import { CommentOnTopicController } from './controllers/comment-on-topic.controller'
import { DeleteNewsController } from './controllers/delete-news.controller'
import { FetchTopicCommentsController } from './controllers/fetch-topic-comments.controller'
import { FetchTopicCommentsUseCase } from '@/domain/web/application/use-cases/fetch-topic-comments'
import { GetUserByIdUseCase } from '@/domain/web/application/use-cases/get-user-by-id'
import { GetUserByTokenController } from './controllers/get-user-by-token.controller'
@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    CreateTopicController,
    AuthenticateController,
    FetchRecentTopicsController,
    GetTopicBySlugController,
    GetNewsBySlugController,
    EditTopicController,
    DeleteTopicController,
    CreateNewsController,
    EditNewsController,
    DeleteNewsController,
    FetchRecentNewsController,
    CommentOnTopicController,
    DeleteTopicCommentController,
    FetchTopicCommentsController,
    GetUserByTokenController,
  ],
  providers: [
    CreateTopicUseCase,
    FetchRecentTopicsUseCase,
    AuthenticateUserUseCase,
    RegisterUserUseCase,
    GetTopicBySlugUseCase,
    GetNewsBySlugUseCase,
    EditTopicUseCase,
    DeleteTopicUseCase,
    CreateNewsUseCase,
    EditNewsUseCase,
    DeleteNewsUseCase,
    FetchRecentNewsUseCase,
    CommentOnTopicUseCase,
    DeleteTopicCommentUseCase,
    FetchTopicCommentsUseCase,
    GetUserByIdUseCase,
  ],
})
export class HttpModule { }
