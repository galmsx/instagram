import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import {Post} from './post.model';
import {User} from './user.model';


@Table({ timestamps: false })
export class Likes extends Model<Likes> {

    @BelongsTo(()=>User,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    user : User;

    @BelongsTo(()=>Post,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    post : Post;

    @PrimaryKey
    @ForeignKey(()=>User)
    @Column
    userId : number;

    @PrimaryKey
    @ForeignKey(()=>Post)
    @Column
    postId : number;

}