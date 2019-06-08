import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db.module/db.module';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {CommentService} from './comments.service';



@Module({
  imports: [DatabaseModule],
  providers: [PostsService,CommentService],
  controllers: [PostsController]
})
export class PostsModule { }
