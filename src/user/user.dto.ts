import {IsInt} from 'class-validator';
export class PagingQuery{
    constructor(){}
   
    readonly limit : number;
   
    readonly offset : number;
}