import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from '../books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from '../Repository/books.repository';
import { BookSchema } from 'src/Entities/Books/books.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule {}
