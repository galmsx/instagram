import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PostHash } from '../db.module/models/PostHash.model';
import { Hash } from '../db.module/models/hash.model';
import { Post } from '../db.module/models/post.model';
import { IToken } from '../customThings/token.decorator';
import { IFile } from './post.interfaces';
import * as fs from 'mz/fs';
import * as path from 'path';
import { where } from 'sequelize/types';

@Injectable()
export class PostsService {
    constructor(@Inject("POST_REPOSITORY") private readonly postRep: typeof Post,
        @Inject("POSTHASH_REPOSITORY") private readonly phRep: typeof PostHash,
        @Inject("HASH_REPOSITORY") private readonly hashRep: typeof Hash) { }




    async createPost(file: IFile, caption: string, token: IToken): Promise<any> {
        if (!(/^image\//.test(file.mimetype))) throw new HttpException('only image files allowed', HttpStatus.BAD_REQUEST);
        var filename = token.id + '-' + new Date().getSeconds() + '-' + Math.round(100 - 0.5 + Math.random() * (999 - 100 + 1)) + '-' + file.originalname;
        await fs.writeFile(path.join(__dirname, "../../photos/", filename), file.buffer);
        const hashes : string[] = caption.match(/#\w{2,10}/g);
        const hashesIds : number[] = await Promise.all<number>(hashes.map(async tag =>{
            var [hash,isNew] = await this.hashRep.findOrCreate({where : {tag}});
            return hash.id;
        }));
        

    }
}

