import { Injectable, BadRequestException, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './Repository/auth.repository';
import { RegisterDTO } from './DTOs/registerDTO';
import { LoginDTO } from 'src/Modules/Auth/DTOs/loginDTO';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private readonly emailService: EmailService,
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

    const verificationToken = this.jwtService.sign(
      { email: newUser.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1d' },
    );

    await this.emailService.sendVerificationEmail(
      newUser.email,
      verificationToken,
    );

    return {
      message:
        'Registration successful. Please check your email to verify your account.',
    };
  }

  async verifyEmail(token: string): Promise<any> {
    let payload: any;

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }

    const user = await this.authRepository.findByEmail(payload.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.isEmailVerified = true;
    await user.save();

    return { message: 'Email verified successfully' };
  }

  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.authRepository.findByEmail(loginDTO.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      throw new BadRequestException(
        'Please verify your email before logging in',
      );
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
