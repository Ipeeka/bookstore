import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksRepository } from './Repository/books.repository';
import { BookSchema } from 'src/Entities/Books/books.schema';
import { BooksService } from './Services/books.service';
import { BooksController } from './books.controller';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationSchema } from 'src/notification/notification.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]) ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository,NotificationService],
})
export class BooksModule {}
