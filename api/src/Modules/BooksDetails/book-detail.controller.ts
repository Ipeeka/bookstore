import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BookDetailsService } from './book-detail.service';
import { bookDetails } from 'src/Modules/BooksDetails/book-detail.schema';
import { CreateBookDetailDTO, UpdateBookDetailDTO } from './book-detailDTO';

@Controller('books-detail')
export class BookDetailsController {
  constructor(private readonly bookDetailsService: BookDetailsService) {}

  @Post()
  async create(
    @Body() createBookDetailDTO: CreateBookDetailDTO,
  ): Promise<bookDetails> {
    return this.bookDetailsService.create(createBookDetailDTO);
  }

  @Get()
  async findAll(): Promise<bookDetails[]> {
    return this.bookDetailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<bookDetails | null> {
    return this.bookDetailsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDetailDTO: UpdateBookDetailDTO,
  ): Promise<bookDetails | null> {
    return this.bookDetailsService.update(id, updateBookDetailDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.bookDetailsService.remove(id);
  }

  @Get(':bookId')
  async findByBookId(@Param('bookId') bookId: string): Promise<bookDetails[]> {
    return this.bookDetailsService.findByBookId(bookId);
  }
}
