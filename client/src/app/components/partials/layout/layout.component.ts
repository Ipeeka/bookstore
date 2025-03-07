import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../../shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MenuModule,
    ButtonModule,
    HeaderComponent,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    CdkDrag,
    BadgeModule,
    CardModule,
    InputTextModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  menuItems: any[] = [];
  constantMenuItems = [
    { name: 'Book List', RouterLink: '/book/list' },
    { name: 'verify', RouterLink: '/auth/verification' },
    {
      name: 'More..',
      RouterLink: '/test',
      icon: 'pi pi-folder',
      children: [
        { name: 'Saved', RouterLink: '/book/bookmark', icon: 'pi pi-folder' },
        // {
        //   name: 'Sub Saved 2',
        //   RouterLink: '/sub-test2',
        //   icon: 'pi pi-folder-open',
        // },
      ],
    },
  ];
  userMenuItems = [];
  adminMenuItems = [{ name: 'User List', RouterLink: '/user/list' }];
  isMenuOpen = false;
  isMenuExpanded = false;
  value: string = '';

  constructor(private authService: AuthService) {}

  toggleTree(item: any): void {
    item.isExpanded = !item.isExpanded;
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserSubject();

    if (currentUser) {
      this.isLoggedIn = true;

      if (currentUser.role === 'admin') {
        this.menuItems = [...this.constantMenuItems, ...this.adminMenuItems];
      } else {
        this.menuItems = [...this.constantMenuItems, ...this.userMenuItems];
      }
    } else {
      this.menuItems = [...this.constantMenuItems];
      this.isLoggedIn = false;
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.menuItems = [...this.constantMenuItems];
  }

  onFloatingMenuClick(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isMenuExpanded = true;
    }
  }

  onMenuItemClick(option: string): void {
    console.log(`${option} clicked`);
    this.isMenuOpen = false;
    this.isMenuExpanded = false;
  }

  onToggleExpandCollapse(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

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
}
