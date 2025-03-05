
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
  UseInterceptors, UploadedFile
} from '@nestjs/common';
import { UserService } from './Services/user.service';
import { Types } from 'mongoose';
import { UpdateUserDTO } from './DTOs/updateUserDTO';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express'; 



@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put('update-user/:id')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, Date.now() + '-' + file.originalname);
        },
      }),
    })
  )
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
    @UploadedFile() profileImage: Express.Multer.File
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException({
        message: 'Invalid User ID format',
        status: false,
      });
    }

    if (profileImage) {
    
      updateUserDTO.profileImage = profileImage.path; 
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
