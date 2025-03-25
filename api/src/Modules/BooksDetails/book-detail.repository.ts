import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';

import {
  bookDetails,
  BookDetailsDocument,
} from 'src/Modules/BooksDetails/book-detail.schema';
import { CreateBookDetailDTO, UpdateBookDetailDTO } from './book-detailDTO';

@Injectable()
export class BookDetailsRepository {
  constructor(
    @InjectModel(bookDetails.name)
    private bookDetailsModel: Model<BookDetailsDocument>,
  ) {}

  async create(
    createBookDetailDTO: CreateBookDetailDTO,
  ): Promise<BookDetailsDocument> {
    const createdBook = new this.bookDetailsModel(createBookDetailDTO);
    return createdBook.save();
  }

  async findAll(): Promise<BookDetailsDocument[]> {
    return this.bookDetailsModel.find().exec();
  }

  async findOne(id: string): Promise<BookDetailsDocument | null> {
    return this.bookDetailsModel.findById(id).exec();
  }

  async update(
    id: string,
    updateBookDetailDTO: UpdateBookDetailDTO,
  ): Promise<BookDetailsDocument | null> {
    return this.bookDetailsModel
      .findByIdAndUpdate(id, updateBookDetailDTO, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.bookDetailsModel.findByIdAndDelete(id).exec();
  }

  async findByBookId(bookId: string): Promise<BookDetailsDocument[]> {
    return this.bookDetailsModel
      .find({ bookId: new mongoose.Types.ObjectId(bookId) })
      .exec();
  }
}
