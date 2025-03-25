import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book, BookDocument } from 'src/Modules/Books/books.schema';
import { CreateBookDTO, UpdateBookDTO } from './booksDTO';

@Injectable()
export class BooksRepository {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(createBookDTO: CreateBookDTO): Promise<Book> {
    const newBook = new this.bookModel(createBookDTO);
    return newBook.save();
  }

  async findBookById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async updateBook(id: string, updateBookDTO: UpdateBookDTO): Promise<Book> {
    try {
      const updatedBook = await this.bookModel
        .findByIdAndUpdate(id, updateBookDTO, { new: true })
        .exec();
      if (!updatedBook) {
        throw new Error('Book not found or could not be updated');
      }
      return updatedBook;
    } catch (error) {
      throw new Error(
        `Error while updating book in repository: ${error.message}`,
      );
    }
  }

  async deleteBook(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId format');
    }

    try {
      const book = await this.bookModel.findById(id).exec();
      if (!book) {
        throw new Error('Book not found');
      }
      await this.bookModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(
        `Error while deleting book in repository: ${error.message}`,
      );
    }
  }

  async searchBooks(query: string): Promise<Book[]> {
    return this.bookModel
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } },
        ],
      })
      .exec();
  }

  async findAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async updateBookmarked(id: string, toggleBookmarked: boolean): Promise<Book> {
    try {
      const updatedBook = await this.bookModel.findByIdAndUpdate(
        id,
        { bookmarked: toggleBookmarked },
        { new: true },
      );
      if (!updatedBook) {
        throw new Error('Book not found');
      }

      return updatedBook;
    } catch (error) {
      throw new Error(
        `Error while updating book in repository: ${error.message}`,
      );
    }
  }

  async updateCartAdded(id: string, toggleCart: boolean): Promise<Book> {
    try {
      const updatedBook = await this.bookModel.findByIdAndUpdate(
        id,
        { cartAdded: toggleCart },
        { new: true },
      );
      if (!updatedBook) {
        throw new Error('Book not found');
      }

      return updatedBook;
    } catch (error) {
      throw new Error(
        `Error while updating book in repository: ${error.message}`,
      );
    }
  }
}
