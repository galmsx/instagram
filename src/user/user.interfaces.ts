import { Post } from '../db.module/models/post.model';

export interface feedResponse {
    meta: meta;
    posts: Post[];
}
interface meta {
    limit: number;
    offset: number;
    count: number;
}
export interface UserInfo {
    login: string;
    id: number;
    subscribersId: number[];
    subscribedToId: number[];
    postsId: number[];

}