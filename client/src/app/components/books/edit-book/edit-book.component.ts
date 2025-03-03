import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookService } from '../../../shared/services/book.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'edit-book',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService, MessageService],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent {
  constructor(
    public dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private bookService: BookService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  onSave(data: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this book?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!data._id) {
          console.error('Book ID is undefined or missing');
          return;
        }

        this.bookService.updateBook(data._id, data).subscribe(
          (updatedBook) => {
            this.dialogRef.close(updatedBook);
            this.messageService.add({
              severity: 'success',
              summary: 'Book Updated',
              detail: 'The book has been updated successfully',
              life: 3000,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: 'Failed to update the book',
              life: 3000,
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Update Canceled',
          detail: 'You have canceled the update action.',
          life: 3000,
        });
      },
    });
  }

  onCancel(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Update Canceled',
      detail: 'You have canceled the update action.',
      life: 3000,
    });

    this.dialogRef.close();
  }
}
