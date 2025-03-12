import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,DialogModule,ButtonModule, InputTextModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {
  isChatOpened = false;
  @Output() chatOpened = new EventEmitter<boolean>();
  messages = [
    { user: 'User1', text: 'Hello, how can I help you?', sent: false },
    { user: 'User2', text: 'I need some help with my account.', sent: true },
  ];
  dropdownOpen = false; 


  openChat() {
    this.isChatOpened = true;
    this.chatOpened.emit(this.isChatOpened);
  }

  
  closeChat() {
    this.isChatOpened = false;
    this.chatOpened.emit(this.isChatOpened); 
  }


  sendMessage() {
    const messageInput = document.querySelector('input') as HTMLInputElement;
    const newMessage = messageInput.value.trim();
    if (newMessage) {
      this.messages.push({ user: 'User', text: newMessage, sent: true });
      messageInput.value = ''; 
    }
  }

 
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  
  clearChat() {
    this.messages = []; 
    this.dropdownOpen = false; 
  }
}
