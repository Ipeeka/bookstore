import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CreateBookDTO, UpdateBookDTO } from './DTOs/booksDTO';
import { BooksService } from './Services/books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/add')
  async addBook(@Body() createBookDTO: CreateBookDTO) {
    try {
      const newBook = await this.booksService.addBook(createBookDTO);
      return newBook;
    } catch (error) {
      throw new Error(`Error in adding book: ${error.message}`);
    }
  }

  @Get()
  async getAllBooks() {
    try {
      const books = await this.booksService.getAllBooks();
      return books;
    } catch (error) {
      throw new Error(`Error in fetching books: ${error.message}`);
    }
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    try {
      const book = await this.booksService.getBookById(id);
      if (!book) {
        return { message: 'Book not found' };
      }
      return { message: 'Book fetched successfully', book };
    } catch (error) {
      throw new Error(`Error in fetching book: ${error.message}`);
    }
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDTO: UpdateBookDTO,
  ) {
    try {
      const updatedBook = await this.booksService.updateBook(id, updateBookDTO);
      return { message: 'Book updated successfully', book: updatedBook };
    } catch (error) {
      throw new Error(`Error in updating book: ${error.message}`);
    }
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    try {
      const result = await this.booksService.deleteBook(id);
      return result;
    } catch (error) {
      throw new Error(`Error in deleting book: ${error.message}`);
    }
  }

  @Get('search')
  async searchBooks(@Query('query') query: string) {
    try {
      const searchResults = await this.booksService.searchBooks(query);
      return { message: 'Books search completed', searchResults };
    } catch (error) {
      throw new Error(`Error in searching books: ${error.message}`);
    }
  }

  @Put(':id/bookmark')
  async toggleBookmark(
    @Param('id') id: string,
    @Body() body: { toggleBookmarked: boolean },
  ) {
    if (!id) {
      throw new Error('Invalid book ID');
    }

    try {
      const updatedBook = await this.booksService.toggleBookmark(
        id,
        body.toggleBookmarked,
      );
      return { message: 'Bookmark toggled successfully', book: updatedBook };
    } catch (error) {
      throw new Error(`Error in toggling bookmark: ${error.message}`);
    }
  }


  @Put(':id/addToCart')
  async toggleCart(
    @Param('id') id: string,
    @Body() body: { toggleCart: boolean },
  ) {
    if (!id) {
      throw new Error('Invalid book ID');
    }

    try {
      const updatedBook = await this.booksService.addToCart(
        id,
        body.toggleCart,
      );
      return { message: 'Added to Cart successfully', book: updatedBook };
    } catch (error) {
      throw new Error(`Error in Adding to Cart : ${error.message}`);
    }
  }

// books.controller.ts
@Delete(':id/removeFromCart')
async removeFromCart(@Param('id') id: string) {
  if (!id) {
    throw new Error('Invalid book ID');
  }

  try {
    const updatedBook = await this.booksService.removeFromCart(id);
    return { message: 'Removed from Cart successfully', book: updatedBook };
  } catch (error) {
    throw new Error(`Error in Removing from Cart: ${error.message}`);
  }
}
}
