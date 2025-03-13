import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsEnum } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  author: string;
 
  @IsString()
@ApiProperty()
publicationYear: string;

  
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  quantity: number;  

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string; 

  @IsEnum(['inStock', 'lowStock', 'preOrder', 'outOfStock'])
  @ApiProperty({ enum: ['inStock', 'lowStock', 'preOrder', 'outOfStock'] })
  inventoryStatus: string;  

 

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  publisher: string; 

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

  @IsString()
  @ApiProperty()
  publicationYear: string;

  @IsNumber()
  @ApiProperty()
  price: number;


  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  genre: string;

  @IsNumber()
  @ApiProperty()
  quantity: number; 

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;  

  @IsEnum(['inStock', 'lowStock', 'preOrder', 'outOfStock'])
  @ApiProperty({ enum: ['inStock', 'lowStock', 'preOrder', 'outOfStock'] })
  inventoryStatus: string;  


  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  publisher: string;  
}
