import { IsString, IsNotEmpty ,IsEmail} from 'class-validator';

export class loginDTO{
constructor(){};
    @IsNotEmpty()
    @IsString()
    readonly login : string;

    @IsNotEmpty()
    @IsString()
    readonly password : string; 
}

export class regDTO{
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email : string;

    @IsNotEmpty()
    @IsString()
    readonly login : string;

    @IsNotEmpty()
    @IsString()
    readonly password : string; 
}