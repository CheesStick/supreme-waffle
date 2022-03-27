import { Controller, UseGuards, Body, Post, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('account')
@UseGuards(AuthGuard)
export class UserController {

  constructor ( private userService: UserService ) {}

  @Post('info')
  get_user_info(@Body() body) {

    return this.userService.getUser(body)
      .then( (data) => ( { success: true, data } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );

  }

  @Patch('update-info')
  update_user_info(@Body() body) {

    return this.userService.updateUser(body)
      .then( (data) => ( { success: true, data } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );

  }

  @Patch('update-photo')
  @UseInterceptors(FileInterceptor('file'))
  update_user_photo(@UploadedFile() file, @Body() body) {

    return this.userService.updateUserPhoto(file, body.token)
      .then( (data) => ( { success: true, data } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );

  }

  @Patch('update-password')
  update_user_password(@Body() body) {

    return this.userService.updateUserPassword(body)
      .then( () => ( { success: true } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );

  }

}
