import { Controller, UsePipes, Post, Body, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../customThings/validation.pipe';
import { IToken } from './auth.interfaces';
import { loginDTO, regDTO } from './auth.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UsePipes(ValidationPipe)
    @Post('login')
    async locallLogin(@Body() login: loginDTO): Promise<IToken> {
        return this.authService.localLogin(login);
    }

    @UsePipes(ValidationPipe)
    @Post('register')
    async localRegister(@Body() reg: regDTO): Promise<IToken> {
        return this.authService.localRegister(reg);
    }

    @Get("google")
    async googleAuth(@Query() query, @Res() res) {
        if (!query.code) res.redirect("/");
        else {
            try {
                var token: string = await this.authService.googleAuth(query.code);
                res.redirect(`/#/auth/${token}`);
            } catch (e) {
                res.redirect('/');
            }
        }
    }

}
