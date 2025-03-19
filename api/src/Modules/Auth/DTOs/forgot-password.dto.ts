import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  newPassword: string;
}
