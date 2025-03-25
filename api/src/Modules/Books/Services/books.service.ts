import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../Repository/books.repository';
import { CreateBookDTO, UpdateBookDTO } from '../DTOs/booksDTO';
import { Book } from '../Repository/books.interface';
import { BookDocument } from 'src/Entities/Books/books.schema';
import { NotificationService } from 'src/notification/notification.service';  
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository, 
     private readonly notificationService: NotificationService,
     @InjectModel('Notification') private readonly notificationModel: Model<Notification>) {}

  async addBook(createBookDTO: CreateBookDTO) {
    return this.booksRepository.createBook(createBookDTO);
  }

  async getAllBooks() {
    return this.booksRepository.findAllBooks();
  }

  async getBookById(id: string) {
    return this.booksRepository.findBookById(id);
  }

  async updateBook(id: string, updateBookDTO: UpdateBookDTO) {
    try {
      const book = await this.booksRepository.findBookById(id);
      if (!book) {
        throw new Error('Book not found');
      }
      return this.booksRepository.updateBook(id, updateBookDTO);
    } catch (error) {
      throw new Error(`Error in updating book: ${error.message}`);
    }
  }

  async deleteBook(id: string) {
    if (!id) {
      throw new Error('Book ID is missing');
    }

    try {
      const book = await this.booksRepository.findBookById(id);
      if (!book) {
        throw new Error('Book not found');
      }

      await this.booksRepository.deleteBook(id);

      // Create and save the notification to the database
      const notification = new this.notificationModel({
        type: 'BOOK_DELETED',
        data: {
          message: 'Book deleted successfully',
          bookName: book.title,
        },
        read: false,
      });

      await notification.save();

      // Send the notification to the frontend
      this.notificationService.sendNotificationToAdmin(notification);

      return { message: 'Book deleted successfully' };
    } catch (error) {
      throw new Error(`Error in deleting book: ${error.message}`);
    }
  }

  async searchBooks(query: string) {
    return this.booksRepository.searchBooks(query);
  }

  async toggleBookmark(
    id: string,
    toggleBookmarked: boolean,
  ): Promise<BookDocument> {
    const book = await this.booksRepository.findBookById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    book.bookmarked = !book.bookmarked;
    return this.booksRepository.updateBookmarked(id, toggleBookmarked);
  }


  async addToCart(
    id: string,
    toggleCart: boolean,
  ): Promise<BookDocument> {
    const book = await this.booksRepository.findBookById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    book.cartAdded = !book.cartAdded;
    return this.booksRepository.updateCartAdded(id, toggleCart);
  }

  async removeFromCart(id: string): Promise<BookDocument> {
    const book = await this.booksRepository.findBookById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    book.cartAdded = false; // Set cartAdded to false
    return this.booksRepository.updateCartAdded(id, false);
  }
}
