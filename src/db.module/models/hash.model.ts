import { Table, Column, Model, ForeignKey, BelongsTo, AllowNull,Unique, HasMany} from 'sequelize-typescript';
import {PostHash} from './PostHash.model'

@Table({ timestamps: false })
export class Hash extends Model<Hash> {
    @Unique
    @AllowNull(false)
    @Column
    tag : string;

    @HasMany(()=>PostHash)
    postHash : PostHash[];
}