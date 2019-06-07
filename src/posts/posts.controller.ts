import { Controller, Get, Post, UseGuards, UploadedFile, UseInterceptors, Put,Body ,UsePipes,Delete, Param} from '@nestjs/common';
import { AuthGuard } from '../customThings/auth.guard';
import {ValidationPipe} from '../customThings/validation.pipe'
import { Token, IToken } from '../customThings/token.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {PostsService} from './posts.service';
import {fileDTO,alterPostDTO} from './post.dto';


@Controller('posts')
export class PostsController {
    constructor(private readonly postServ : PostsService) { };

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("Photo"))
    @UsePipes(ValidationPipe)
    async createPost(@UploadedFile() file : fileDTO, @Body("Caption") caption: string, @Token() token: IToken) {
        await this.postServ.createPost(file,caption,token);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deletePost(@Param('id') id :number,@Token() token : IToken){
        await this.postServ.deletePost(id,token);
    }
    
    @Put(':id')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    async alterPost(@Param('id') id : number,@Token() token : IToken, @Body() body : alterPostDTO){
        await this.postServ.alterPost(id,body.caption,token);
    }


}
