import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Module({
  imports: [],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, User],
})
export class AppModule {}
