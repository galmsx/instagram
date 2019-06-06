import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as JWT from 'jsonwebtoken';
var secret: string = require('../../config.json').jwtSecret;

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    var token: string = request.get('authorization')
    try {
      JWT.verify(token, secret)
    }
    catch (e) {
      throw new UnauthorizedException;
    }
    return true;
  }
}