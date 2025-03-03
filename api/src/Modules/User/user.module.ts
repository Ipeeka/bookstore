
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Entities/User/user.schema';
import { UserService } from './Services/user.service';
import { UserRepository } from './Repository/user.repository';
import { UserController } from './user.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
      ],
      providers: [UserService, UserRepository],
      controllers: [UserController]
})
export class UserModule {}
