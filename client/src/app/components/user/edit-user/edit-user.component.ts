import { Component, inject, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'edit-user',
  standalone:true,
  imports: [MatFormFieldModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditUserComponent>
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    debugger;
    this.userService.getUserById(this.data.userId).subscribe({
      next: (res) => {
        this.userForm = new FormGroup({
          firstName: new FormControl(res.firstName, Validators.required),
          lastName: new FormControl(res.lastName, Validators.required),
          email: new FormControl(res.email, [
            Validators.required,
            Validators.email,
          ]),
        });
      },
      error: () => {
        this.snackBar.open('Failed to load user data', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  saveProfile(): void {
    if (this.userForm.valid) {
      this.userService
        .updateUser(this.data.userId, this.userForm.value)
        .subscribe({
          next: () => {
            this.snackBar.open('Profile updated successfully', 'Close', {
              duration: 3000,
            });
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackBar.open('Failed to update profile', 'Close', {
              duration: 3000,
            });
          },
        });
    }
  }

  close(): void {
    this.snackBar.open('Discard successfully', 'Close', {
      duration: 3000,
    });
    this.dialogRef.close();
  }
}
