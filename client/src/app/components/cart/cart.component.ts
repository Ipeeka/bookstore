import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { BookService } from '../../shared/services/book.service';
import { Book } from '../books/book-list/book-list.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ToastModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartBooks: Book[] = [];
  shippingCost = 2.99;
 

  private messageService = inject(MessageService);
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadCartBooks();
  }

  loadCartBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.cartBooks = books.filter((detail) => detail.cartAdded === true);
    });
  }

  get subtotal(): number {
    return this.cartBooks.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  // increaseQuantity(item: cartBooks) {
  //   item.quantity++;
  //   this.bookService.addToCart(item); 
  // }

  // decreaseQuantity(item: CartItem) {
  //   if (item.quantity > 1) {
  //     item.quantity--;
  //     this.bookService.addToCart(item);
  //   } else {
  //     this.removeFromCart(item.id);
  //   }
  // }

  updateQuantity(bookId: string,hange: number) {
   
  }


  removeFromCart(bookId: string): void {
    console.log('Removing book with ID:', bookId);
    if (!bookId) {
      console.error('Book ID is undefined');
      return;
    }

    this.bookService.removeFromCart(bookId).subscribe(
      (response) => {
        // Remove the book from the local cartBooks array
        this.cartBooks = this.cartBooks.filter((book) => book._id !== bookId);

        this.messageService.add({
          severity: 'success',
          summary: response.message,
          detail: 'Book removed from cart',
          life: 3000,
        });
      },
      (error) => {
        console.error('Error removing from cart:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to remove book from cart',
          life: 3000,
        });
      }
    );
  }
}
