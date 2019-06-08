import { IsString, IsNotEmpty} from 'class-validator';

export class QueryDTO{
    constructor(){}
    @IsString()
    @IsNotEmpty()
    query : string;
}