import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import {  MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {  MatIconModule } from '@angular/material/icon';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { UserService } from '../../../shared/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService, MessageService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users = [];
  displayedColumns: string[] = [
    'serialNo',
    'email',
    'userName',
    'firstName',
    'lastName',
    'role',
    'actions',
  ];
  tableHeaderBgColor: string = '#dddddd';
  private userService = inject(UserService);

  private dialog = inject(MatDialog);
  private unsubscribe: Subscription[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: (err) => {
        // this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
      },
    });
  }

  editUser(id: string): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { userId: id },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUsers();
      }
    });
  }
  deleteUser(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Delete User Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-info',

      accept: () => {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted Successfully',
              detail: 'User has been successfully removed.',
              life: 3000,
            });

            this.getAllUsers();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Deletion Failed',
              detail:
                'An error occurred while deleting the user. Please try again later.',
              life: 3000,
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Delete Canceled',
          detail: 'You chose not to delete this user.',
          life: 3000,
          styleClass: 'p-button-info',
        });
      },
    });
  }
}
