import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Entities/User/user.schema';
import { IUserRepository } from './user.interface';
import { UpdateUserDTO } from '../DTOs/updateUserDTO';


@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    return await this.userModel.find();
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDTO, { new: true });
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findOne(query: object) {
    return this.userModel.findOne(query).exec();
  }

 
  async updateOne(query: object, update: object) {
    return this.userModel.updateOne(query, update).exec();
  }

}
