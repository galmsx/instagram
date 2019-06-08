import { Controller, Post, UseGuards, UploadedFile, UseInterceptors, Put, Body, UsePipes, Delete, Param, Get } from '@nestjs/common';
import { AuthGuard } from '../customThings/auth.guard';
import { ValidationPipe } from '../customThings/validation.pipe'
import { Token, IToken } from '../customThings/token.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CommentService } from './comments.service';
import { fileDTO, alterPostDTO, commnetDTO } from './post.dto';
import { ILikes, IComments } from './post.interfaces';



@Controller('posts')
export class PostsController {
    constructor(private readonly postServ: PostsService,
        private readonly commServ: CommentService) { };

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("Photo"))
    @UsePipes(ValidationPipe)
    async createPost(@UploadedFile() file: fileDTO, @Body("Caption") caption: string, @Token() token: IToken) {
        await this.postServ.createPost(file, caption, token);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deletePost(@Param('id') id: number, @Token() token: IToken) {
        await this.postServ.deletePost(id, token);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    async alterPost(@Param('id') id: number, @Token() token: IToken, @Body() body: alterPostDTO) {
        await this.postServ.alterPost(id, body.caption, token);
    }
    @Post(':id/likes')
    @UseGuards(AuthGuard)
    async like(@Param('id') id: number, @Token() token: IToken) {
        await this.postServ.likePost(id, token);
    }
    @Delete(':id/likes')
    @UseGuards(AuthGuard)
    async unlike(@Param('id') id: number, @Token() token: IToken) {
        await this.postServ.unlikePost(id, token)
    }
    @Get(':id/likes')
    async getLikes(@Param('id') id: number): Promise<ILikes> {
        return this.postServ.getLikes(id);
    }

    @Post(':id/comments')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    async addComments(@Token() token: IToken, @Body() body: commnetDTO, @Param('id') id: number) {
        await this.commServ.createComment(id, token, body.text);
    }
    @Delete('/comments/:id')
    @UseGuards(AuthGuard)
    async deleteComment(@Token() token: IToken, @Param('id') id: number) {
        await this.commServ.deleteComment(id, token);
    }

    @Put('/comments/:id')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    async alterComment(@Token() token: IToken, @Body() body: commnetDTO, @Param('id') id: number) {
        await this.commServ.alterComment(id, token, body.text)
    }
    @Get(':id/comments')
    async getComments(@Param('id') id: number): Promise<IComments> {
        return this.commServ.getComments(id);
    }


}
