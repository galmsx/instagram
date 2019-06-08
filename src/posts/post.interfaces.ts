export interface ILikes {
    usersId: number[];
}
interface comment{
    id : number;
    text : string;
    login : string;
    userId : number;
    createdAt : string;
    updatedAt : string;
    postId : number;
}
export interface IComments{
    comments : comment[];
}