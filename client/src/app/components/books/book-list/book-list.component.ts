import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../../../shared/services/book.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AddBookComponent } from '../add-book/add-book.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthService } from '../../../shared/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { SelectButton, SelectButtonModule } from 'primeng/selectbutton';

export interface Book {
  id: string;
  title: string;
  author: string;
  publicationYearMonth: string;
  price: number;
  availability: boolean;
  genre: string;
  bookmarked: boolean;
}

interface Comment {
  bookId: number;
  Comments: string;
  UserName: string;
  likes: number;
  dislikes: number;
  userId: number;
}

@Component({
  selector: 'app-book-list',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  imports: [
    SelectButtonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    MatButtonToggleModule,
    DialogModule,
    AddBookComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService, MessageService],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements AfterViewInit, OnInit {
  books: Book[] = [];
  tableHeaderBgColor: string = '#dddddd';
  dataSource = new MatTableDataSource<Book>();
  columnsToDisplay: string[] = [
    'serialNo',
    'title',
    'author',
    'publicationYear',
    'price',
    'genre',
    'availability',
    'actions',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Book | null | undefined;
  genres: string[] = ['Fiction', 'Non-fiction', 'Science', 'Fantasy'];
  items: MenuItem[] | undefined;
  showFilter: boolean = false;
  selectedGenre: string = 'all';
  selectedAvailability: string = 'all';
  selectedPrice: number = 1000;
  isFilterVisible: boolean = false;
  hideSingleSelectionIndicator = signal(true);
  isSearchVisible: boolean = false;
  searchQuery: string = '';
  newComment: string = '';
  isUser: boolean = false;
  displayDialog: boolean = false;
  addedComments: string = '';
  addLikes: boolean = false;
  addDislikes: boolean = false;
  currentUser: any;
  bookDetails: any;
  comments: Comment[] = [];
  bookmarkedBooks: Book[] = [];
  statuses: any[] = [
    { label: 'In Stock', value: 'inStock', bgColor: '#DCFCE7', textColor: '#208646' },
    { label: 'Low Stock', value: 'lowStock', bgColor: '#FFEDD5', textColor: '#C2440F' },
    { label: 'Pre-order', value: 'preOrder', bgColor: 'lightblue', textColor: 'black' },
    { label: 'Out of Stock', value: 'outOfStock', bgColor: '#FEE2E2', textColor: '#B91C1C' },
  ];
  viewMode: 'table' | 'grid' = 'table';
  options = ['table', 'grid'];

  getStatusLabel(status: string): string {
    const found = this.statuses.find(s => s.value.toLowerCase() === status?.toLowerCase().trim());
    return found ? found.label : 'Unknown';
  }
  
  getStatusStyle(status: string): any {
    const found = this.statuses.find(s => s.value.toLowerCase() === status?.toLowerCase().trim());
    return found ? { 
      'background-color': found.bgColor,
      'color': found.textColor,
      'padding': '5px 10px',
      'border-radius': '10px',
      'font-weight': 'bold',
      'display': 'inline-block',
      'min-width': '90px',
      'text-align': 'center'
    } : {};
  }
  
  
  
  toggleCommentSection(bookId: string): void {
    this.isCommentSectionVisible = !this.isCommentSectionVisible;

    if (this.isCommentSectionVisible) {
      this.loadComment(bookId);
    }
  }

  loadComment(bookId: string) {
    this.bookService.getBookDetails().subscribe(
      (bookDetail) => {
        this.comments = bookDetail.filter((detail) => detail.bookId === bookId);
        console.log(this.comments);
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  submitComment(): void {
    console.log(this.newComment);
    this.newComment = '';
  }

  isCommentSectionVisible = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserSubject();
    if (this.currentUser.role === 'user') {
      this.isUser = true;
      this.columnsToDisplay = this.columnsToDisplay.filter(
        (column) => column !== 'actions'
      );
      this.columnsToDisplayWithExpand = this.columnsToDisplay.filter(
        (column) => column !== 'actions'
      );
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    }
    this.bookService.getAllBooks().subscribe((books) => {
      this.dataSource.data = books;

      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
    this.getBooks();
  }

  toggleBookmark(bookId: string, toggleBookmarked: boolean): void {
    this.bookService.toggleBookmark(bookId, toggleBookmarked).subscribe(
      (response) => {
        this.loadBooks();
        this.messageService.add({
          severity: 'success',
          summary: response.message,
          detail: `Bookmarked status toggled`,
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

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
      this.dataSource.data = books;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getBooks(): void {
    this.bookService.getAllBooks().subscribe(
      (books) => {
        debugger;
        this.books = books;
        this.dataSource.data = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  openAddBookDialog(): void {
    this.displayDialog = true;
  }

  onDialogHide(): void {}

  onBookSaved(newBook: any): void {
    console.log('New Book Added:', newBook);
    this.getBooks();
    this.displayDialog = false;
  }
  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }
  filteredBooks = [...this.books];

  applyFilter(): void {
    const filter: any = {};

    this.bookService.getAllBooks().subscribe(
      (books) => {
        let filteredBooks = books;

        if (this.selectedGenre && this.selectedGenre !== 'all') {
          filteredBooks = filteredBooks.filter(
            (book) =>
              book.genre.toLowerCase() === this.selectedGenre.toLowerCase()
          );
        }

        if (
          this.selectedAvailability !== undefined &&
          this.selectedAvailability !== 'all'
        ) {
          filteredBooks = filteredBooks.filter(
            (book) => book.availability.toString() === this.selectedAvailability
          );
        }

        if (this.selectedPrice !== undefined) {
          filteredBooks = filteredBooks.filter(
            (book) => book.price <= this.selectedPrice
          );
        }

        this.books = filteredBooks;
        this.dataSource.data = this.books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  clearFilters(): void {
    this.selectedGenre = 'all';
    this.selectedAvailability = 'all';
    this.selectedPrice = 1000;
  }

  openEditDialog(book: Book): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '600px',
      data: { ...book },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBooks();
      }
    });
  }

  deleteBook(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this book?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            this.getBooks();

            this.messageService.add({
              severity: 'success',
              summary: 'Book Deleted',
              detail: 'The book has been deleted successfully',
              life: 3000,
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete Failed',
              detail: 'Failed to delete the book',
              life: 3000,
            });
          },
        });
      },

      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Delete Canceled',
          detail: 'You have canceled the delete action.',
          life: 3000,
        });
      },
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.dataSource.data = this.books;
    } else {
      this.dataSource.data = this.books.filter(
        (book) =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.price.toString().includes(this.searchQuery)
      );
    }
  }

  saveBookDetails(bookid: string) {
    console.log(this.addedComments);
    console.log(this.addDislikes);
    console.log(this.addLikes);

    let addBookDetails = {
      bookId: bookid,
      userId: this.currentUser._id,
      UserName: this.currentUser.userName,
      Comments: this.addedComments,
      createdAt: new Date().toISOString(),
      likes: this.addLikes || '',
      disLikes: this.addDislikes || '',
    };

    this.bookService.addBookDetails(addBookDetails).subscribe(
      (response) => {
        //this.books = response;
        this.loadComment(response.bookId);
        //this.dataSource.data = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  onLikeDislikeChange(likeOrDislike: string, bookid: string) {
    let updatedBookDetails = {
      like: likeOrDislike === 'like' ? 'true' : 'false',
      dislike: likeOrDislike === 'dislike' ? 'true' : 'false',
      bookId: bookid,
      userId: this.currentUser._id,
    };

    if (updatedBookDetails.like === 'like') {
      updatedBookDetails.dislike = 'false';
    }

    this.bookService.updateBookLikeDisLike(updatedBookDetails).subscribe(
      (books) => {
        this.books = books;
        this.dataSource.data = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
}
