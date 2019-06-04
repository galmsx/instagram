import { Table, Column, Model,AllowNull,Unique,IsEmail,HasMany,DefaultScope} from 'sequelize-typescript';
import {Subscribe} from './subscribe.model';
import {Post} from './post.model';
import {Likes} from './likes.model';
import {Comments} from './comments.model';


@Table({timestamps: true})
export class User extends Model<User> {

  @Unique
  @AllowNull(false)
  @Column
  login: string;
  
  @AllowNull(false)
  @Column
  password : string;

  
  @Unique
  @IsEmail
  @Column
  email : string;

  @HasMany(()=>Subscribe,"subId")
  subscribedTo : Subscribe[];

  @HasMany(()=>Subscribe,"userId")
  subscibers : Subscribe[];

  @HasMany(()=>Post)
  posts : Post[];

  @HasMany(()=>Likes)
  likes : Likes[];

  @HasMany(()=>Comments)
  comments : Comments[];
  
}