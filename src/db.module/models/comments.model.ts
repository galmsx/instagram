import { Table, Column, Model, ForeignKey, BelongsTo, AllowNull} from 'sequelize-typescript';
import {Post} from './post.model';
import {User} from './user.model';


@Table({ timestamps: true })
export class Comments extends Model<Comments> {

    @BelongsTo(()=>User,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    user : User;

    @BelongsTo(()=>Post,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    post : Post;

    @ForeignKey(()=>User)
    @Column
    userId : number;

    @ForeignKey(()=>Post)
    @Column
    postId : number;

    @AllowNull(false)
    @Column
    text : string;



}