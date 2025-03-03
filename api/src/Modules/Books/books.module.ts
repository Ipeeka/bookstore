

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 

import { BooksRepository } from './Repository/books.repository';
import { BookSchema } from 'src/Entities/Books/books.schema';
import { BooksService } from './Services/books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BooksController],  
  providers: [BooksService, BooksRepository],  
})
export class BooksModule {}
