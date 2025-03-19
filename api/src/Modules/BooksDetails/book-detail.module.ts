import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookDetailsController } from './book-detail.controller';
import { BookDetailsService } from './Services/book-detail.service';
import {
  bookDetails,
  BookDetailsSchema,
} from 'src/Entities/BookDetails/book-detail.schema';
import { BookDetailsRepository } from './Repository/book-detail.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: bookDetails.name, schema: BookDetailsSchema },
    ]),
  ],
  controllers: [BookDetailsController],
  providers: [BookDetailsService, BookDetailsRepository],
})
export class BookDetailsModule {}
