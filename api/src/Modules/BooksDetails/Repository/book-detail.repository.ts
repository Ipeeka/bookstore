import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CreateBookDetailDTO, UpdateBookDetailDTO } from '../DTOs/book-detailDTO';
import { bookDetails, BookDetailsDocument } from 'src/Entities/BookDetails/book-detail.schema';


@Injectable()
export class BookDetailsRepository {
  constructor(@InjectModel(bookDetails.name) private bookDetailsModel: Model<BookDetailsDocument>) {}

  async create(createBookDetailDTO: CreateBookDetailDTO): Promise<BookDetailsDocument> {
    const createdBook = new this.bookDetailsModel(createBookDetailDTO);
    return createdBook.save();
  }

  async findAll(): Promise<BookDetailsDocument[]> {
    return this.bookDetailsModel.find().exec();
  }

  async findOne(id: string): Promise<BookDetailsDocument | null> {
    return this.bookDetailsModel.findById(id).exec();
  }

  async update(id: string, updateBookDetailDTO: UpdateBookDetailDTO): Promise<BookDetailsDocument | null> {
    return this.bookDetailsModel.findByIdAndUpdate(id, updateBookDetailDTO, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.bookDetailsModel.findByIdAndDelete(id).exec();
  }

  async findByBookId(bookId: string): Promise<BookDetailsDocument[]> {
    return this.bookDetailsModel.find({ bookId: new mongoose.Types.ObjectId(bookId) }).exec();
  }  
}
