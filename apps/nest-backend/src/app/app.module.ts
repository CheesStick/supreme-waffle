import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { UserController } from '../user/user.controller';
import { BlogController } from '../blog/blog.controller';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { BlogService } from '../blog/blog.service';
import { User } from '../user/user';
import { Blog } from '../blog/blog';

@Module({
  controllers: [AuthController, UserController, BlogController],
  providers: [AuthService, UserService, BlogService, Blog, User],
})
export class AppModule {}
