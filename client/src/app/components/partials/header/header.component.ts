import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { BookService } from '../../../shared/services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService,MessageService]  ,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userProfileVisible: boolean = false;
  userName: string = '';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  searchQuery: string = '';
  profileItems: any[] = [];
  profileMenuVisible: boolean = false; 
  private userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private bookService: BookService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserSubject();
    if (currentUser) {
      this.userName = currentUser.userName;
      this.isLoggedIn = true;
      this.userProfileVisible = true;
      this.isAdmin = currentUser.role === 'admin';

      this.profileItems = [
        { label: 'Edit Profile', icon: 'pi pi-pencil', routerLink: '/user/edit-profile' },
        { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.onLogout() },
      ];
    }
  }

  onLogout(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      header: 'Logout Confirmation',
      icon: 'pi pi-exclamation-triangle',
   
      accept: () => {
    
        this.authService.logout();
        this.isLoggedIn = false;
        this.userProfileVisible = false;
        this.router.navigate(['/login']);
        this.messageService.add({ severity: 'success', summary: 'Logged Out', detail: 'You have successfully logged out', life: 3000 });
      },
      reject: () => {
      
        this.messageService.add({ severity: 'info', summary: 'Logout Canceled', detail: 'You chose to stay logged in', life: 3000 ,styleClass: 'p-button-danger'});
      },
      acceptButtonStyleClass: 'p-button-danger', 
    rejectButtonStyleClass: 'p-button-info'  
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      return;
    }
    this.bookService.searchBooks(this.searchQuery).subscribe(
      (data) => {
        if (data.message) {
          alert(data.message);
        } else {
          this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
        }
      },
      (error) => {
        alert('An error occurred while searching');
      }
    );
  }

  
  toggleProfileMenu(): void {
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.user-profile');
    if (!clickedInside && this.profileMenuVisible) {
      this.profileMenuVisible = false;
    }
  }
}

