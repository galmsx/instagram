import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { DatabaseModule } from '../db.module/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
