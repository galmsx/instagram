import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DatabaseModule} from './db.module/db.module';
import { AuthModule } from './auth/auth.module';
import {ValidationPipe} from './validation.pipe';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,{
    provide : APP_PIPE,
    useClass : ValidationPipe
  }],
})
export class AppModule {}
