import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db.module/db.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [DatabaseModule, AuthModule, PostsModule, UserModule, SearchModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
