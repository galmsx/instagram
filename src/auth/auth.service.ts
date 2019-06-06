import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../db.module/models/user.model';
import { IToken } from './auth.interfaces';
import { loginDTO, regDTO } from './auth.dto';
import * as JWT from 'jsonwebtoken';
import * as fetch from 'node-fetch';
const sha256 = require('sha256');
const secret = require('../../config.json').jwtSecret;
const { redirect_uri, client_id, client_secret } = require('../../config.json').Google;

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

    private async isLoginExist(login: string) {
        return this.userRep.findOne({ where: { login } });
    }
    async googleAuth(code: string): Promise<string> {
        var res = await fetch("https://accounts.google.com/o/oauth2/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=authorization_code`
        });
        res = await res.json();
        const { access_token } = res;
        var userInfo = await (await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`)).json();

        const email: string = userInfo.email;
        var user = await this.userRep.findOne({ where: { email } });
        if (!user) {
            var login: string = email.substring(0, email.indexOf("@"));

            while (await this.isLoginExist(login)) login = login + 1;

            var password = sha256(Math.round(0 - 0.5 + Math.random() * (999999 - 0 + 1)).toString());
            user = await this.userRep.create({ login, email, password });
        }
        return this.getToken(user);

    }

}
