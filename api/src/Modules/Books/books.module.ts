import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksRepository } from './Repository/books.repository';
import { BookSchema } from 'src/Entities/Books/books.schema';
import { BooksService } from './Services/books.service';
import { BooksController } from './books.controller';
import { NotificationService } from 'src/notification/notification.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]), ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository,NotificationService],
})
export class BooksModule {}
