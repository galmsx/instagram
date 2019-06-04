import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../db.module/models/user.model';
import { IToken } from './auth.interfaces';
import { loginDTO, regDTO } from './auth.dto';
import * as JWT from 'jsonwebtoken';
const secret = require('../../config.json').jwtSecret;

@Injectable()
export class AuthService {
    constructor(@Inject("USER_REPOSITORY") private readonly userRep: typeof User) { }
    private getToken(user: User): string {
        return JWT.sign({
            id: user.id,
            login: user.login
        }, secret, { expiresIn: "7d" });
    }

    async localLogin(login: loginDTO): Promise<IToken> {
        var user = await this.userRep.findOne({ where: { login: login.login, password: login.password } });
        if (!user) throw new HttpException("wrong login/password!", HttpStatus.NOT_IMPLEMENTED);
        return { token: this.getToken(user) };
    }
    async localRegister(reg: regDTO): Promise<IToken> {
        try {
            var user = await this.userRep.create({
                login: reg.login,
                password: reg.password,
                email: reg.email
            });
            return { token: this.getToken(user) };
        } catch (e) {
            throw new HttpException("not unique login/email!", HttpStatus.NOT_IMPLEMENTED);
        }
    }

}
