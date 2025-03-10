
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Entities/User/user.schema';
import { UserService } from './Services/user.service';
import { UserRepository } from './Repository/user.repository';
import { UserController } from './user.controller';
import { AuthModule } from '../Auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule),
      ],
      providers: [UserService, UserRepository],
      controllers: [UserController],
      exports: [UserService,UserRepository],  
})
export class UserModule {}
