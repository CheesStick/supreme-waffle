import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user';

@Module({
  controllers: [UserController],
  providers: [UserService, User],
  exports: [User]
})
export class UserModule {}
