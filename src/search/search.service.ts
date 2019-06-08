import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Post } from '../db.module/models/post.model';
import { User } from '../db.module/models/user.model';
import { PostHash } from '../db.module/models/PostHash.model';
import { Hash } from '../db.module/models/hash.model';
import { Op } from "sequelize"
import { searchResp } from './search.interfaces';

@Injectable()
export class SearchService {
    constructor(@Inject("POST_REPOSITORY") private readonly postRep: typeof Post,
        @Inject("POSTHASH_REPOSITORY") private readonly phRep: typeof PostHash,
        @Inject("HASH_REPOSITORY") private readonly hashRep: typeof Hash,
        @Inject("USER_REPOSITORY") private readonly userRep: typeof User) { }

    async search(keywords: string[]): Promise<searchResp> {
        const tagquery = keywords.map(w => {
            return {
                tag: {
                    [Op.like]: '%' + w + '%'
                }
            };
        });
        var hashesId: number[] = (await this.hashRep.findAll({
            where: {
                [Op.or]: tagquery
            }
        })).map(e => e.id);

        const loginquery = keywords.map(w => {
            return {
                login: {
                    [Op.like]: '%' + w + '%'
                }
            };
        });
        var users = await this.userRep.findAll({
            where: {
                [Op.or]: loginquery
            }
        })

        var posts = await this.postRep.findAll({
            include: [{
                model: PostHash,
                where: { hashId: hashesId }
            }]
        })

        return {
            posts,
            users: users.map(u => {
                return { id: u.id, login: u.login }
            })
        }
    }
}
