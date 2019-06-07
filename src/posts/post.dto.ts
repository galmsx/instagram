import { IsString, IsNotEmpty ,IsInt,IsInstance} from 'class-validator';
import { Buffer } from 'buffer';

export class fileDTO {
    constructor() { }

    @IsNotEmpty()
    @IsString()
    readonly fieldname: string;
    @IsNotEmpty()
    @IsString()
    readonly originalname: string;
    @IsNotEmpty()
    @IsString()
    readonly encoding: string;

    @IsNotEmpty()
    @IsString()
    readonly mimetype: string;
    
   @IsInstance(Buffer)
    readonly buffer: Buffer;

    @IsInt()
    size : number;

}
export class alterPostDTO{
    constructor(){}
    @IsNotEmpty()
    @IsString()
    readonly caption : string;
}