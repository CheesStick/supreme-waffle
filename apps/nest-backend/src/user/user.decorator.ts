import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const UserID = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.token || req.body.token;

    return jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      return decoded.id;
    })
    
  }
);