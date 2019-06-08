import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { SearchService } from './search.service';
import { ValidationPipe } from '../customThings/validation.pipe'
import { QueryDTO } from './search.dto';
import { searchResp } from './search.interfaces';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }
    @Get()
    @UsePipes(ValidationPipe)
    async search(@Query() query: QueryDTO): Promise<searchResp> {
        const keywords: string[] = query.query.split(',');
        return this.searchService.search(keywords);
    }


}
