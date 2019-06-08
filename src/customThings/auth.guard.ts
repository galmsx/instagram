import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as JWT from 'jsonwebtoken';
var secret: string = require('../../config.json').jwtSecret;
import { User } from '../db.module/models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject("USER_REPOSITORY") private readonly userRep: typeof User) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    var token: string = request.get('authorization')
    try {
      var payload = JWT.verify(token, secret)
      if (!(await this.userRep.findOne({ where: { id: payload.id, login: payload.login } }))) throw new Error();

    }
    catch (e) {
      throw new UnauthorizedException;
    }
    return true;
  }
}