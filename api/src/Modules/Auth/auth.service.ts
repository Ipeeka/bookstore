import { Injectable, BadRequestException, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './Repository/auth.repository';
import { RegisterDTO } from './DTOs/registerDTO';
import { LoginDTO } from 'src/Modules/Auth/DTOs/loginDTO';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';

import { UserService } from '../User/Services/user.service';
import { randomBytes } from 'crypto'; // Ensure this import is added


@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    
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
      newUser.firstName,  
      newUser.lastName    
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

  async forgotPassword(email: string) {
    // Check if the user exists
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Generate OTP (6 characters in hex format)
    const otp = randomBytes(3).toString('hex'); // 3 bytes = 6 hexadecimal characters

    // Send OTP via email
    await this.emailService.sendOtpEmail(email, otp);

    // Store OTP in the database or cache (can use Redis or MongoDB)
    await this.userService.storeOtp(email, otp);

    return { message: 'OTP sent to your email' };
  }

  async verifyOtp(email: string, otp: string) {
    const storedOtp = await this.userService.getOtp(email);

    if (!storedOtp || storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    return { message: 'OTP verified successfully' };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const storedOtp = await this.userService.getOtp(email);

    if (!storedOtp || storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updatePassword(email, hashedPassword);

    return { message: 'Password reset successfully' };
  }
}
