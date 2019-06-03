import { Sequelize } from 'sequelize-typescript';
import {Subscribe} from './models/subscribe.model';
import {User} from './models/user.model';
import {Post} from './models/post.model';
import {Likes} from './models/likes.model';
import {Comments} from './models/comments.model';
import {PostHash} from './models/PostHash.model';
import {Hash} from './models/hash.model';
var conf = require('../../config.json').dbConf;

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize(conf);
        sequelize.addModels([User,Subscribe,Post,Likes,Comments,Hash,PostHash]);
        await sequelize.sync();
        return sequelize;
      },
    },
    {
      provide : 'USER_REPOSITORY',
      useValue : User
    },
    {
      provide : 'SUBSCRIBE_REPOSITORY',
      useValue : Subscribe
    }
  ];