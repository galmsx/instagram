import { Controller, Get, Put, Body, UsePipes, Delete, Param, UseGuards, Query, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../customThings/auth.guard';
import { ValidationPipe } from '../customThings/validation.pipe'
import { Token, IToken } from '../customThings/token.decorator';
import { PagingQuery } from './user.dto';
import { feedResponse, UserInfo } from './user.interfaces';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/feed')
    @UseGuards(AuthGuard)
    async getFeed(@Token() token: IToken, @Query() query: PagingQuery): Promise<feedResponse> {
        const limit = +query.limit || 100;
        const offset = +query.offset || 0;
        return this.userService.getFeed(token, limit, offset);
    }

    @Get(':id/posts')//user posts
    async getUserPosts(@Param('id') id: number, @Query() query: PagingQuery): Promise<feedResponse> {
        const limit = +query.limit || 100;
        const offset = +query.offset || 0;
        return this.userService.getUserPosts(id, limit, offset);
    }
    @UseGuards(AuthGuard)
    @Post(':id/subscribe')
    async subscribeTo(@Param('id') id: number, @Token() token: IToken) {
        return this.userService.subscribeTo(id, token);
    }
    @UseGuards(AuthGuard)
    @Delete(':id/subscribe')
    async unsubscribeFrom(@Param('id') id: number, @Token() token: IToken) {
        return this.userService.unsubscribeFrom(id, token);
    }
    @Get(':id')//user info
    async getUserInfo(@Param('id') id: number): Promise<UserInfo> {
        return this.userService.getUserInfo(id);
    }



}
