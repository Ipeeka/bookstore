import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {
  isMenuOpen = false;
  isMenuExpanded = false;
  value: string = '';

  // Toggle chat menu
  onFloatingMenuClick(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isMenuExpanded = true;
    }
  }
  messages = [
    { user: 'User1', text: 'Hello, how can I help you?', sent: false },
    { user: 'User2', text: 'I need some help with my account.', sent: true },
  ];

  // Toggle expand/collapse of the chat
  onToggleExpandCollapse(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  // Resize chat box (optional)
  onResizeChatBox(event: MouseEvent): void {
    let chatBox = document.querySelector('.floating-chat') as HTMLElement;
    let initialHeight = chatBox.offsetHeight;
    let initialY = event.clientY;

    const resize = (moveEvent: MouseEvent) => {
      const newHeight = initialHeight + (moveEvent.clientY - initialY);
      chatBox.style.height = `${Math.max(150, newHeight)}px`;
    };

    const stopResizing = () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResizing);
    };

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  }

  // Handle menu item click (send message in this case)
  onMenuItemClick(option: string): void {
    console.log(`${option} clicked`);
    this.isMenuOpen = false;
    this.isMenuExpanded = false;
  }
}
