import { Table, Column, Model, ForeignKey, BelongsTo,HasMany } from 'sequelize-typescript';
import { User } from './user.model';
import {Likes} from './likes.model';
import {Comments} from './comments.model';
import {PostHash} from './PostHash.model';

@Table({ timestamps: true })
export class Post extends Model<Post> {

    @Column
    caption: string;

    @Column
    photo: string;

    @BelongsTo(() => User,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    user: User;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @HasMany(()=>Likes)
    likes : Likes[];

    @HasMany(()=>Comments)
    comments : Comments[];

    @HasMany(()=>PostHash)
    postHash : PostHash[];
}