import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems = [
    {
      name: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      genre: 'Psychology',
      format: 'Digital',
      price: 9.99,
      quantity: 2,
      img: 'https://i.imgur.com/2DsA49b.webp',
      availability: 'In Stock',
    },
    {
      name: 'Homo Deus: A Brief History of Tomorrow',
      author: 'Yuval Noah Harari',
      genre: 'History',
      format: 'Paperback',
      price: 13.5,
      quantity: 1,
      img: 'https://i.imgur.com/Oj1iQUX.webp',
      availability: 'Out of Stock',
    },
  ];

  shippingCost = 2.99;

  get subtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeFromCart(itemName: string) {
    this.cartItems = this.cartItems.filter((item) => item.name !== itemName);
  }
}
