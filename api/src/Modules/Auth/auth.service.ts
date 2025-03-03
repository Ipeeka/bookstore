import { Injectable, BadRequestException, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './Repository/auth.repository';
import { RegisterDTO } from './DTOs/registerDTO';
import { LoginDTO } from 'src/Modules/Auth/DTOs/loginDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO): Promise<any> {
    const existingUser = await this.authRepository.findByEmail(
      registerDTO.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDTO.password, 10);

    const newUser = await this.authRepository.createAuth(
      registerDTO,
      hashedPassword,
    );

    const payload = {
      email: newUser.email,
      sub: newUser._id,
      role: newUser.role,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }

  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.authRepository.findByEmail(loginDTO.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id, role: user.role };

    const token = this.jwtService.sign(payload);

    return {
      data: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: token,
      },
      message: 'Login successful',
      status: true,
    };
  }
}
