import { IsEmail, MinLength, Length, IsJWT, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @Length(8, 28)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LogoutUserDto {
  @IsJWT()
  token: string;
}