import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @ApiProperty()
  publicationYear: number;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsBoolean()
  @ApiProperty()
  availability: boolean;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  genre: string;
}

export class UpdateBookDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @ApiProperty()
  publicationYear: number;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsBoolean()
  @ApiProperty()
  availability: boolean;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  genre: string;
}
