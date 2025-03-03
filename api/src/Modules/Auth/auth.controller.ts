
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
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
}
