import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail()
    @ApiProperty()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDTO {
  @IsEmail()
    @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
    @ApiProperty()
  otp: string;

  @IsNotEmpty()
    @ApiProperty()
  newPassword: string;
}
