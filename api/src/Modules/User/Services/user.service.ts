
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../Repository/user.repository';
import { IUserService } from './user.service.interface';
import { UpdateUserDTO } from '../DTOs/updateUserDTO';
import { debug } from 'console';

@Injectable()
export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async updateUser(id: string, updateUserDTO: UpdateUserDTO) {
    console.log('Updating user with data:', updateUserDTO);
    
    if (updateUserDTO.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateUserDTO.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email already exists');
      }
    }
  
    return this.userRepository.updateUser(id, updateUserDTO);
  }
  

  async getUser(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        status: false,
      });
    }
    return user;
  }

  async getAllUser() {
    const users = await this.userRepository.findAll();
    return {
      data: users,
      message: 'Users retrieved successfully',
      status: true,
    };
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.deleteUser(id);
    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        status: false,
      });
    }
    return { message: 'User deleted successfully', status: true };
  }
}
