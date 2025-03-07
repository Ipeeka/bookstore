
import { Controller, Post, Body, BadRequestException, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/Modules/Auth/DTOs/registerDTO';
import { LoginDTO } from 'src/Modules/Auth/DTOs/loginDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    try {
      const result = await this.authService.register(registerDTO);
      return { token: result.token };
    } catch (error) {
      console.error(error); 
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    try {
      const result = await this.authService.login(loginDTO);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    try {
      const result = await this.authService.verifyEmail(token);
      return { message: result.message };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
