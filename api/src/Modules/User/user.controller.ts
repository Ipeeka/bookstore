
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './Services/user.service';
import { JwtAuthGuard } from 'src/Common/Guards/jwt.guard';
import { Types } from 'mongoose';
import { RolesGuard } from 'src/Common/Guards/roles.guard';
import { UpdateUserDTO } from './DTOs/updateUserDTO';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put('update-user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      debugger
      throw new NotFoundException({
        message: 'Invalid User ID format',
        status: false,
      });
    }
    return this.userService.updateUser(id, updateUserDTO);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException({
        message: 'Invalid User ID format',
        status: false,
      });
    }
    return this.userService.getUser(id);
  }

  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException({
        message: 'Invalid User ID format',
        status: false,
      });
    }
    return this.userService.deleteUser(id);
  }
}
