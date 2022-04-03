import { Injectable } from '@nestjs/common';
import { User as UserProvider } from '../user/user';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  constructor ( private user: UserProvider) {}

  private token = (id) => jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' })

  private userID = (token) => (
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if ( err ) throw new Error('invalid token');
      return decoded.id;
    })
  )

  async register(body) {
    try {
      body.password = await bcrypt.hash(body.password, 10);
      const user: User = await this.user.createUser(body);
      return this.token(user.id);
    } catch (err) {
      if ( err.code === 'P2002' ) err.message = 'email already in use';
      throw new Error(err.message);
    }

  }

  async login(email, password) {
    try {
      const user: User = await this.user.findUserByEmail(email) ;
      const auth = await bcrypt.compare(password, user.password);
      if ( user && auth ) {
        return  this.token(user.id) 
      }
      else throw new Error('incorrect password');
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async logout(token)  {
    this.user.findUserByID( this.userID(token) ).catch( (err) => (err.message) );
  }

}
