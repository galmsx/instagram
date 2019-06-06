import { Controller, Get, Post, UseGuards, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { AuthGuard } from '../customThings/auth.guard';
import { Token, IToken } from '../customThings/token.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {PostsService} from './posts.service';
import {IFile} from './post.interfaces';

@Controller('posts')
export class PostsController {
    constructor(private readonly postServ : PostsService) { };

    @Get()
    @UseGuards(AuthGuard)
    async testGet(@Token() token: IToken) {
        console.log(token.login);
        return "yeah"
    }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("Photo"))
    async createPost(@UploadedFile() file : IFile, @Body("Caption") caption: string, @Token() token: IToken) {
        console.log(file);
        console.log(caption);
        console.log(token);
        await this.postServ.createPost(file,caption,token);
        return "done";
    }


}
