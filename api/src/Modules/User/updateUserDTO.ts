import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @ApiProperty()
  @IsOptional()
  userName?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  phone?: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  street?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  city?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  state?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  profileImage?: string;
}
