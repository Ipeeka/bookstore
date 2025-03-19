import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/Entities/User/user.schema';
import { AuthService } from './auth.service';
import { AuthRepository } from './Repository/auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailService } from './email.service';
import { UserModule } from '../User/user.module';
import { UserService } from '../User/Services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '2h' },
      }),
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, JwtStrategy, AuthRepository, EmailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
