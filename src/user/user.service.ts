import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IToken } from '../customThings/token.decorator';
import { User } from '../db.module/models/user.model';
import { Post } from '../db.module/models/post.model';
import { Subscribe } from '../db.module/models/subscribe.model';
import { feedResponse, UserInfo } from './user.interfaces';

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY") private readonly userRep: typeof User,
        @Inject("POST_REPOSITORY") private readonly postRep: typeof Post,
        @Inject("SUBSCRIBE_REPOSITORY") private readonly subRep: typeof Subscribe
    ) { }

    async getFeed(token: IToken, limit: number, offset: number): Promise<feedResponse> {
        var fromUsersId: number[] = (await this.userRep.findOne({
            where: { id: token.id },
            include: [{ model: Subscribe, as: "subscribedTo", attributes: ["userId"] }]
        })).subscribedTo.map(e => e.userId);

        fromUsersId.push(token.id);

        var { rows, count } = await this.postRep.findAndCountAll({
            where: { userId: fromUsersId },
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });

        return {
            meta: { count, limit, offset },
            posts: rows
        }
    }

    async getUserPosts(id: number, limit: number, offset: number): Promise<feedResponse> {
        var { rows, count } = await this.postRep.findAndCountAll({
            where: { userId: id },
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        return {
            meta: { count, limit, offset },
            posts: rows
        }
    }

    async getUserInfo(id: number): Promise<UserInfo> {
        var user = await this.userRep.findOne({
            where: { id },
            include: [
                {
                    model: Subscribe, as: "subscribedTo", attributes: ["userId"]
                },
                {
                    model: Subscribe, as: "subscibers", attributes: ["subId"]
                },
                {
                    model: Post, attributes: ['id']
                }
            ]
        });
        if (!user) throw new HttpException("user does not exist", HttpStatus.NOT_FOUND);
        return {
            id: user.id,
            login: user.login,
            subscribersId: user.subscibers.map(e => e.subId),
            subscribedToId: user.subscribedTo.map(e => e.userId),
            postsId: user.posts.map(e => e.id)
        }
    }

    async subscribeTo(id: number, token: IToken) {
        return this.subRep.create({ userId: id, subId: token.id })
    }
    async unsubscribeFrom(id: number, token: IToken) {
        return this.subRep.destroy({
            where: {
                userId: id, subId: token.id
            }
        })
    }
}
