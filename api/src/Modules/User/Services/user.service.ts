/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
    if (updateUserDTO.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateUserDTO.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email already exists');
      }
    }

    await this.userRepository.updateUser(id, updateUserDTO);
    return { message: 'User updated successfully', status: true };
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
