import {Post} from '../db.module/models/post.model';
export interface searchResp{
    posts : Post[];
    users : IUsers[]
}

interface IUsers{
    id : number;
    login : string;
}