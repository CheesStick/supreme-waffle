import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { readFileSync, unlink } from 'fs';
import * as sharp from 'sharp';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User as UserProvider } from './user';

@Injectable()
export class UserService {

  constructor ( private user: UserProvider ) {}

  private path = '/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img';

  private userID = (token) => (
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if ( err ) throw new Error('invalid token');
      return decoded.id;
    })
  )

  async getUser(token) {
    try {
      const user: User = await this.user.findUserByID( this.userID(token) );
      const image = readFileSync(`${ this.path }/${ user.image }`);

      return { data: {
        username: user.username,
        email: user.email,
        image
      } };

    } catch (err) {
      return err.message;
    }
  } 

  async updateUser(username, email, token) {
    try {

      if ( username || email ) {
        const user: User = await this.user.updateUser({ username, email }, this.userID(token));
        return { username: user.username, email: user.email };
      } else throw new Error('data must be provided to update user account');

    } catch (err) {
      return err.message;
    }
  }

  async updateUserPhoto(file, token) {
    try {
      
      const user: User =  await this.user.findUserByID( this.userID(token) );
  
      if ( file ) {
        const filename = `${ user.id }-${ Date.now() }.jpeg`;
          
        if ( user.image !== 'default.jpeg' ) {
          unlink(`${ this.path }/${ user.image }`, (err) => {
            if ( err ) throw err.message;
          });
        }

        sharp(file.buffer)
          .resize(100)
          .jpeg()
          .toFile(`${ this.path }/${ filename }`);

        await this.user.updateUser({ image: filename }, this.userID(token));

        return readFileSync(`${ this.path }/${ filename }`);
      } else throw new Error('data must be provided to update user account');

    } catch (err) {
      return err.message;
    }
  }

  async updateUserPassword(currentPassword, password, token) {
    try {
      const user: User = await this.user.findUserByID( this.userID(token) );
      const match = await bcrypt.compare(currentPassword, user.password);
      if ( match ) {
        password = await bcrypt.hash(password, 10);
        await this.user.updateUser({ password }, this.userID(token));
      } else throw new Error('Invalid password');
      return true;
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

}