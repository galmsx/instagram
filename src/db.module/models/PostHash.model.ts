import { Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Hash} from './hash.model';
import {Post} from './post.model';

@Table({ timestamps: false })
export class PostHash extends Model<PostHash> {
    @BelongsTo(()=>Post,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    post : Post;
    @BelongsTo(()=>Hash,{onDelete : "CASCADE", onUpdate : "CASCADE"})
    hash : Hash;

    @ForeignKey(()=>Post)
    @Column
    postId : number;

    @ForeignKey(()=>Hash)
    @Column
    hashId : number;


}