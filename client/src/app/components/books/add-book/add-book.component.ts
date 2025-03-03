import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../shared/services/book.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    MessagesModule,
    FormsModule,
  ],
  providers: [MessageService],
})
export class AddBookComponent {
  addBookForm: FormGroup;
  private bookService = inject(BookService);
  private route = inject(Router);

  displayDialog: boolean = true;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.addBookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      publicationYear: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')],
      ],
      availability: [true],
      genre: ['', [Validators.required]],
    });
  }

  onSubmit() {
    debugger;
    if (this.addBookForm.valid) {
      const formValues = this.addBookForm.value;
      const book = {
        ...formValues,
        price: parseFloat(formValues.price),
        publicationYear: parseInt(formValues.publicationYear),
      };

      this.bookService.addBook(book).subscribe(
        (response) => {
          console.log('Book added successfully', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Book added successfully!',
          });

          this.displayDialog = false;
          this.route.navigate(['book/list']);
        },
        (error) => {
          console.error('Error adding book', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error adding book. Please try again.',
          });
        }
      );
    } else {
      console.error('Form is invalid', this.addBookForm.errors);
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Form is invalid. Please check the inputs.',
      });
    }
  }
}
