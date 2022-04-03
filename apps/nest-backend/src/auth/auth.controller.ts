import { Controller, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterUserDto, LoginUserDto, LogoutUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  sign_up(@Body() body: RegisterUserDto) {
    return this.authService.register(body)
      .then( (data) => ( { success: true, data } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );
  }

  @Post('sign-in')
  sign_in(@Body() body: LoginUserDto) {
    return this.authService.login(body.email, body.password)
      .then( (data) => ( { success: true, data } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );
  }

  @Delete('sign-out')
  @UseGuards(AuthGuard)
  sign_out(@Body() body: LogoutUserDto) {
    return this.authService.logout(body)
      .then( _ => ( { success: true } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );
  }

}
