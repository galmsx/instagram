import { createParamDecorator } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
var secret: string = require('../../config.json').jwtSecret;
export const Token = createParamDecorator((data, req) : IToken => {
    var token: string = req.get('authorization')
    return JWT.verify(token, secret);
});

export interface IToken{
    id : number;
    login : string;
    iat : number;
    exp : number;
}