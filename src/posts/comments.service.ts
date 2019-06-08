import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Post } from '../db.module/models/post.model';
import { User } from '../db.module/models/user.model';
import { Comments } from '../db.module/models/comments.model';
import { IToken } from '../customThings/token.decorator';
import { IComments } from './post.interfaces';
import * as email from 'emailjs';

@Injectable()
export class CommentService {
    constructor(@Inject("POST_REPOSITORY") private readonly postRep: typeof Post,
        @Inject("COMMENT_REPOSITORY") private readonly commtRep: typeof Comments,
        @Inject("USER_REPOSITORY") private readonly userRep: typeof User) {
        this.email = email.server.connect({
            user: "galmsx@gmail.com",
            password: "kzvpggqkvcydchak",
            host: "smtp.gmail.com",
            ssl: true
        });
    }
    private readonly email;
    private sendNotifications(toUsers: User[], login: string, postId: number) {
        if(!toUsers.length) return;
        this.email.send({
            text: `you have been mentioned by ${login}! \n under postId : ${postId}`,
            from: "cali4Gram",
            to: toUsers.map(u => `user <${u.email}>`).join(' ,'),
            cc: "",
            subject: "Notification"
        });
    }

    async createComment(id: number, token: IToken, text: string) {
        var post = await this.postRep.findByPk(id);
        if (!post) throw new HttpException("post does't exist", HttpStatus.NOT_FOUND);
        var logins: string[] = text.match(/@[\w\.]{3,20}/g) || []
        logins = logins.map(l => l.slice(1));
        var mentionedUsers = await this.userRep.findAll({ where: { login: logins } });
        this.sendNotifications(mentionedUsers, token.login, post.id);
        return this.commtRep.create({ userId: token.id, postId: id, text });
    }
    async deleteComment(id: number, token: IToken) {
        var comment = await this.commtRep.findByPk(id);
        if (!comment) throw new HttpException("comment does't exist", HttpStatus.NOT_FOUND);
        if (comment.userId != token.id) throw new HttpException("you don't have permisions to do that", HttpStatus.NOT_IMPLEMENTED);
        return comment.destroy();
    }
    async alterComment(id: number, token: IToken, text: string) {
        var comment = await this.commtRep.findByPk(id);
        if (!comment) throw new HttpException("comment does't exist", HttpStatus.NOT_FOUND);
        if (comment.userId != token.id) throw new HttpException("you don't have permisions to do that", HttpStatus.NOT_IMPLEMENTED);
        comment.text = text;
        return comment.save();
    }
    async getComments(id: number): Promise<IComments> {
        var comments = await this.commtRep.findAll({
            where: { postId: id },
            include: [{ model: User }],
            order :[['createdAt', 'DESC']]
        });
        return {
            comments: comments.map(c => {
                return {
                    id: c.id,
                    text: c.text,
                    login: c.user.login,
                    userId: c.userId,
                    createdAt: c.createdAt,
                    updatedAt: c.createdAt,
                    postId: c.postId
                }
            })
        }

    }

}