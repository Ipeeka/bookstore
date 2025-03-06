import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../shared/services/book.service';
import { Book } from '../book-list/book-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
  bookmarkedBooks: Book[] = [];
  tableHeaderBgColor: string = '#dddddd';
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBookmarkedBooks();
  }

  loadBookmarkedBooks(): void {
  
    this.bookService.getAllBooks().subscribe((books) => {
   
      this.bookmarkedBooks = books.filter(
        (detail) => detail.bookmarked === true
      );
    });
  }
}
