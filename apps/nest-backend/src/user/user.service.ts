import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { readFileSync, unlink } from 'fs';
import * as jwt from 'jsonwebtoken';
import * as sharp from 'sharp';
import { User as UserProvider } from './user';

@Injectable()
export class UserService {

  constructor ( private user: UserProvider ) {}

  private userID = (token) => (
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if ( err ) throw new Error('invalid token');
      return decoded.id;
    })
  )

  async getUser(token) {
    try {

      const user: User = await this.user.findUserByID(this.userID(token));
      const image = readFileSync(`/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img/${ user.image }`);

      return { data: {
        username: user.username,
        email: user.email,
        image
      } };

    } catch (err) {
      return err.message;
    }
  } 

  async updateUser(body) {
    try {
      
      const { username, email, token } = body;

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
          unlink(`/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img/${ user.image }`, (err) => {
            if ( err ) throw err.message;
          });
        }

        sharp(file.buffer)
          .resize(100)
          .jpeg()
          .toFile(`/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img/${ filename }`);

        await this.user.updateUser({ image: filename }, this.userID(token));

        return readFileSync(`/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img/${ filename }`);

      } else throw new Error('data must be provided to update user account');

    } catch (err) {
      return err.message;
    }
  }

  async updateUserPassword(body) {
    // update user password
  }

}
