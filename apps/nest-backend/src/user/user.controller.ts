import { Controller, UseGuards, Body, Post, Patch, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('account')
@UseGuards(AuthGuard)
export class UserController {

  constructor ( private userService: UserService ) {}

  @Post('info')
  get_user_info(@Body() body) {

    return this.userService.getUser(body.token)
      .then( (data) => ( { success: true, data } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );

  }

  @Patch('update-info')
  update_user_info(@Body() body) {

    const { username, email, token } = body;
    return this.userService.updateUser(username, email, token)
      .then( (data) => ( { success: true, data } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );

  }

  @Patch('update-photo')
  @UseInterceptors(FileInterceptor('file'))
  update_user_photo(@UploadedFile() image, @Headers() haeders) {
    
    return this.userService.updateUserPhoto(image, haeders.token)
      .then( (data) => ( { success: true, data } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );

  }

  @Patch('update-password')
  update_user_password(@Body() body) {

    const { currentPassword, password, token } = body;
    return this.userService.updateUserPassword(currentPassword, password, token)
      .then( () => ( { success: true } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );

  }

}
