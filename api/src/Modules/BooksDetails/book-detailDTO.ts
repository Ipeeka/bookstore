import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateBookDetailDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  bookId: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @ApiProperty()
  UserName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Comments: string;

  @IsDateString()
  @ApiProperty()
  createdAt: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  likes?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  disLikes?: string;
}

export class UpdateBookDetailDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  bookId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  userId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  UserName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  Comments?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  likes?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  disLikes?: string;
}
