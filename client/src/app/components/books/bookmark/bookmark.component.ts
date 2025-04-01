import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { BookService } from '../../../shared/services/book.service';
import { Book } from '../book-list/book-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessageService } from 'primeng/api';

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
    MatButtonModule,
    MatIconModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MatTooltipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
  bookmarkedBooks: Book[] = [];
  tableHeaderBgColor: string = '#dddddd';
  constructor(
    private bookService: BookService,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef
  ) {}
  statuses: any[] = [
    {
      label: 'In Stock',
      value: 'inStock',
      bgColor: '#DCFCE7',
      textColor: '#208646',
    },
    {
      label: 'Low Stock',
      value: 'lowStock',
      bgColor: '#FFEDD5',
      textColor: '#C2440F',
    },
    {
      label: 'Pre-order',
      value: 'preOrder',
      bgColor: 'lightblue',
      textColor: 'black',
    },
    {
      label: 'Out of Stock',
      value: 'outOfStock',
      bgColor: '#FEE2E2',
      textColor: '#B91C1C',
    },
  ];

  getStatusLabel(status: string): string {
    const found = this.statuses.find(
      (s) => s.value.toLowerCase() === status?.toLowerCase().trim()
    );
    return found ? found.label : 'Unknown';
  }

  getStatusStyle(status: string): any {
    const found = this.statuses.find(
      (s) => s.value.toLowerCase() === status?.toLowerCase().trim()
    );
    return found
      ? {
          'background-color': found.bgColor,
          color: found.textColor,
          padding: '5px 10px',
          'border-radius': '10px',
          'font-weight': 'bold',
          display: 'inline-block',
          'min-width': '90px',
          'text-align': 'center',
        }
      : {};
  }

  ngOnInit(): void {
    this.loadBookmarkedBooks();
  }

  loadBookmarkedBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.bookmarkedBooks = books.filter(
        (detail) => detail.bookmarked === true
      );

      this.cdRef.detectChanges();
    });
  }

  toggleCart(bookId: string, currentCartStatus: boolean): void {
    this.bookService.toggleCart(bookId, currentCartStatus).subscribe(
      (response) => {
        const book = this.bookmarkedBooks.find((b) => b._id === bookId);
        if (book) {
          book.cartAdded = !book.cartAdded;
        }

        this.messageService.add({
          severity: 'success',
          summary: response.message,
          detail: `Cart status toggled`,
          life: 3000,
        });
      },
      (error) => {
        console.error('Error toggling cart:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to toggle cart',
          life: 3000,
        });
      }
    );
  }

  toggleBookmark(bookId: string, currentBookmarkedStatus: boolean): void {
    this.bookService.toggleBookmark(bookId, currentBookmarkedStatus).subscribe(
      (response) => {
        const book = this.bookmarkedBooks.find((b) => b._id === bookId);
        if (book) {
          book.bookmarked = !book.bookmarked;
        }

        this.loadBookmarkedBooks();

        this.messageService.add({
          severity: 'success',
          summary: response.message,
          detail: `Bookmark status toggled`,
          life: 3000,
        });
      },
      (error) => {
        console.error('Error toggling bookmark:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to toggle bookmark',
          life: 3000,
        });
      }
    );
  }
}
