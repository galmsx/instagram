import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PostHash } from '../db.module/models/PostHash.model';
import { Hash } from '../db.module/models/hash.model';
import { Post } from '../db.module/models/post.model';
import { Likes } from '../db.module/models/likes.model';
import { IToken } from '../customThings/token.decorator';
import { fileDTO } from './post.dto';
import { validate } from "class-validator";
import * as fs from 'mz/fs';
import * as path from 'path';
import { ILikes } from './post.interfaces';

@Injectable()
export class PostsService {
    constructor(@Inject("POST_REPOSITORY") private readonly postRep: typeof Post,
        @Inject("POSTHASH_REPOSITORY") private readonly phRep: typeof PostHash,
        @Inject("HASH_REPOSITORY") private readonly hashRep: typeof Hash,
        @Inject("LIKES_REPOSITORY") private readonly likeRep: typeof Likes) { }

    private async  findHashes(caption: string, post: Post) {

        const hashes: string[] = caption.match(/#\w{2,12}/g) || [];
        return Promise.all(hashes.map(async tag => {
            var [hash, isNew] = await this.hashRep.findOrCreate({ where: { tag } });
            await this.phRep.create({ postId: post.id, hashId: hash.id })
        }));
    }
    async createPost(file: fileDTO, caption: string, token: IToken): Promise<any> {
        try { await validate(file) } catch (e) { throw new HttpException("bad file", HttpStatus.BAD_REQUEST) };
        if (!(/^image\//.test(file.mimetype))) throw new HttpException('only image files allowed', HttpStatus.BAD_REQUEST);
        var filename = token.id + '-' + new Date().getSeconds() + '-' + Math.round(100 - 0.5 + Math.random() * (999 - 100 + 1)) + '-' + file.originalname;
        await fs.writeFile(path.join(__dirname, "../../photos/", filename), file.buffer);

        var post = await this.postRep.create({
            caption,
            photo: filename,
            userId: token.id
        });
        
        return this.findHashes(caption, post);
    }

    async deletePost(id: number, token: IToken) {
        var post = await this.postRep.findByPk(id);
        if (!post) throw new HttpException("post does't exist", HttpStatus.NOT_FOUND);
        if (post.userId != token.id) throw new HttpException("you don't hav permision to do that", HttpStatus.FORBIDDEN);
        await fs.unlink(path.join(__dirname, "../../photos/", post.photo));
        return post.destroy();
    }

    async alterPost(id: number, caption: string, token: IToken) {
        var post = await this.postRep.findByPk(id);
        if (!post) throw new HttpException("post does't exist", HttpStatus.NOT_FOUND);
        if (post.userId != token.id) throw new HttpException("you don't hav permision to do that", HttpStatus.FORBIDDEN);
        post.caption = caption;
        await post.save();
        return this.findHashes(caption, post);
    }
    async likePost(id: number, token: IToken) {
        var post = await this.postRep.findByPk(id);
        if (!post) throw new HttpException("post does't exist", HttpStatus.NOT_FOUND);
        return this.likeRep.findOrCreate({
            where: {
                userId: token.id,
                postId: post.id
            }
        });
    }
    async unlikePost(id: number, token: IToken) {
        var like = await this.likeRep.findOne({ where: { userId: token.id, postId: id } });
        if (!like) return;
        return like.destroy();
    }
    async getLikes(id: number): Promise<ILikes> {
        var likes = (await this.likeRep.findAll({ where: { postId: id } })) || [];
        return {
            usersId: likes.map(e => e.userId)
        }

    }

}

