import { Table, Column, Model,PrimaryKey,ForeignKey,BelongsTo} from 'sequelize-typescript';
import {User} from './user.model';


@Table({timestamps: false})
export class Subscribe extends Model<Subscribe> {
    
@PrimaryKey
@ForeignKey(()=>User,)
@Column
userId : number;

@BelongsTo(()=>User,"userId",)
user : User;

@PrimaryKey
@ForeignKey(()=>User)
@Column
subId : number;

@BelongsTo(()=>User,"subId")
subscriber : User;

}