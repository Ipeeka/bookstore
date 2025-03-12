import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ChatbotService } from './chat-bot.service';

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
  messages: Array<{ user: string; text: string; sent: boolean }> = [];
  userMessage: string = '';
  dropdownOpen = false; 
  constructor(private chatbotService: ChatbotService) {}

  openChat() {
    this.isChatOpened = true;
    this.chatOpened.emit(this.isChatOpened);
  }

  
  closeChat() {
    this.isChatOpened = false;
    this.chatOpened.emit(this.isChatOpened); 
  }


  sendMessage() {
    const message = this.userMessage.trim();
    if (message) {
      this.messages.push({ user: 'User', text: message, sent: true });
      this.userMessage = ''; 

     
      this.chatbotService.askGemini(message).subscribe(
        (response) => {
          this.messages.push({
            user: 'Gemini',
            text: response.candidates[0].content.parts[0].text, 
            sent: false,
          });
          console.log("response", response.candidates[0].content.parts[0].text)
        },
        (error) => {
          this.messages.push({
            user: 'Gemini',
            text: 'Sorry, something went wrong!',
            sent: false,
          });
          console.error('Error:', error);
        }
      );
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
