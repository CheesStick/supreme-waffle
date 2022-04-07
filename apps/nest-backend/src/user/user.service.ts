import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { readFileSync, unlink } from 'fs';
import * as sharp from 'sharp';
import * as bcrypt from 'bcrypt';
import { User as UserProvider } from './user';
import { assert } from 'superstruct';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

  constructor ( private readonly user: UserProvider, private readonly prisma: PrismaService ) {}

  async getUser(userID) {
    try {
      const user: User = await this.user.findUserByID( userID );
      return { success: true, data: {
        username: user.username,
        email: user.email,
        image: readFileSync(`/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img/users/${ user.image }`)
      } };

    } catch (err) {
      throw new HttpException("internel server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 

  async updateUser(username, email, userID) {
    try {

      assert({ username, email }, this.prisma.updateUserInfo);
      const user: User = await this.user.updateUser({ username, email }, userID);
      return { success: true, data: {
        username: user.username,
        email: user.email
      } };

    } catch (err) {
      if ( err.code === 'P2002' ) err.meta.target = "email or username has already been taken";
      return err;
    }
  }

  async updateUserPhoto(file, userID) {
    try {
      
      const user: User =  await this.user.findUserByID( userID );
  
      if ( file ) {
        const filename = `${ user.id }-${ Date.now() }.jpeg`;
          
        if ( user.image !== 'default.jpeg' ) {
          unlink(`/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img/users/${ user.image }`, (err) => {
            if ( err ) throw err.message;
          });
        }

        sharp(file.buffer)
          .resize(100)
          .jpeg()
          .toFile(`/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img/users/${ filename }`);

        await this.user.updateUser({ image: filename }, userID);

        return {
          success: true,
          image: readFileSync(`/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img/users/${ filename }`, 'base64')
        }
      } throw new HttpException('no data provided', HttpStatus.BAD_REQUEST);

    } catch (err) {
      return err;
    }
  }

  async updateUserPassword(currentPassword, password, userID) {
    try {
      const user: User = await this.user.findUserByID( userID );
      const match = await bcrypt.compare(currentPassword, user.password);
      if ( match ) {
        password = await bcrypt.hash(password, 10);
        await this.user.updateUser({ password }, userID);
      } else throw new Error('Invalid password');
      return true;
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

}