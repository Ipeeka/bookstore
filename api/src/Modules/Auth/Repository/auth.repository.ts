import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Entities/User/user.schema';
import { IAuthRepository } from './auth.interface';
import { RegisterDTO } from '../DTOs/registerDTO';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUser(id: string) {
    return await this.userModel.findById(id);
  }

  async createAuth(registerDTO: RegisterDTO, hashedPassword: string) {
    const { email, userName, firstName, lastName, role } = registerDTO;
    const user = new this.userModel({
      email,
      password: hashedPassword,
      userName,
      firstName,
      lastName,
      role,
    });
    return await user.save();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
