import { Injectable } from '@nestjs/common';
import { bookDetails } from 'src/Modules/BooksDetails/book-detail.schema';
import { CreateBookDetailDTO, UpdateBookDetailDTO } from './book-detailDTO';
import { BookDetailsRepository } from './book-detail.repository';

@Injectable()
export class BookDetailsService {
  constructor(private readonly bookDetailsRepository: BookDetailsRepository) {}

  async create(createBookDetailDTO: CreateBookDetailDTO): Promise<bookDetails> {
    return this.bookDetailsRepository.create(createBookDetailDTO);
  }

  async findAll(): Promise<bookDetails[]> {
    return this.bookDetailsRepository.findAll();
  }

  async findOne(id: string): Promise<bookDetails | null> {
    return this.bookDetailsRepository.findOne(id);
  }

  async update(
    id: string,
    updateBookDetailDTO: UpdateBookDetailDTO,
  ): Promise<bookDetails | null> {
    return this.bookDetailsRepository.update(id, updateBookDetailDTO);
  }

  async remove(id: string): Promise<any> {
    return this.bookDetailsRepository.remove(id);
  }

  async findByBookId(bookId: string): Promise<bookDetails[]> {
    return this.bookDetailsRepository.findByBookId(bookId);
  }
}
