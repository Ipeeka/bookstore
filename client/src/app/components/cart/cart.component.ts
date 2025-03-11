import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: { name: string; quantity: number }[] = [];

  addToCart(itemName: string) {
    const item = this.cartItems.find(item => item.name === itemName);
    if (item) {
      item.quantity++;
    } else {
      this.cartItems.push({ name: itemName, quantity: 1 });
    }
  }

  removeFromCart(itemName: string) {
    this.cartItems = this.cartItems.filter(item => item.name !== itemName);
  }
}