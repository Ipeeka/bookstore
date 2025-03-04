import { Component, inject, OnInit, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'edit-user',
  standalone:true,
  imports: [MatFormFieldModule, CommonModule, FormsModule, ReactiveFormsModule,MatInputModule,ConfirmDialogModule,
      ToastModule,MatButtonModule],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ConfirmationService, MessageService],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  private userService = inject(UserService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditUserComponent>,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    debugger;
    this.userService.getUserById(this.data.userId).subscribe({
      next: (res) => {
        this.userForm = new FormGroup({
          userName: new FormControl(res.userName, Validators.required),
          firstName: new FormControl(res.firstName, Validators.required),
          lastName: new FormControl(res.lastName, Validators.required),
          email: new FormControl(res.email, [
            Validators.required,
            Validators.email,
          ]),
        });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user data' });
      },
    });
  }

  saveProfile(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.data.userId, this.userForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
          this.dialogRef.close(true);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update profile' });
        },
      });
    }
  }

  close(): void {
    this.messageService.add({ severity: 'info', summary: 'Discarded', detail: 'Changes discarded successfully' });
    this.dialogRef.close();
  }
}
