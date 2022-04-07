import { Controller, UseGuards, Body, Post, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { UserID } from './user.decorator';

@Controller('account')
@UseGuards(AuthGuard)
export class UserController {

  constructor ( private userService: UserService ) {}

  @Post('info')
  get_user_info(@UserID() userID) {
    return this.userService.getUser(userID);

  }

  @Patch('update-info')
  update_user_info(@Body() body, @UserID() userID) {
    return this.userService.updateUser(body.username, body.email, userID)

  }

  @Patch('update-photo')
  @UseInterceptors(FileInterceptor('file'))
  update_user_photo(@UploadedFile() image, @UserID() userID) {
    return this.userService.updateUserPhoto(image, userID);
  }

  @Patch('update-password')
  update_user_password(@Body() body, @UserID() userID) {
    return this.userService.updateUserPassword(body.currentPassword, body.password, userID);
  }

}
