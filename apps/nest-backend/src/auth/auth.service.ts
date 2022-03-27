import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { RegisterUserDto, LoginUserDto, LogoutUserDto } from './dto/register-user.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const token = (id) => jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

@Injectable()
export class AuthService {

  private prisma = new PrismaClient();

  async register(body: RegisterUserDto) {
    try {
      body.password = await bcrypt.hash(body.password, 10);
      const user: User = await this.prisma.user.create({ data: body });
      return token(user.id);
    } catch (err) {
      if ( err.code === 'P2002' ) err.message = 'email already in use';
      return err.message;
    }

  }

  async login(body: LoginUserDto) {
    try {
      const { email, password } = body;
      const user: User = await this.prisma.user.findUnique({ where: { email } });
      const auth = await bcrypt.compare(password, user.password);
      if ( user && auth ) {
        return token(user.id);
      } throw new Error('incorrect password');
    } catch (err) {
      return err.message;
    }
  }

  logout(body: LogoutUserDto)  {

    try {
      jwt.verify(body.token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if ( err ) throw new Error('invalid token');
        // await this.prisma.user.findUnique({ where: { id: decoded.id } });
      })
    } catch (err) {
      return err.message;
    }

  }

}
