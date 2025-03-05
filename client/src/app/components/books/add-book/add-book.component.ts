import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';
import { StepperModule } from 'primeng/stepper';
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    StepsModule,
    PanelModule,
    StepperModule
    
  ],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookComponent {
  addBookForm: FormGroup;
  private bookService = inject(BookService);
  private route = inject(Router);
  private dialogRef = inject(MatDialogRef<AddBookComponent>); 
  readonly dialog = inject(MatDialog);

  displayDialog: boolean = true;
  genres: string[] = ['Fiction', 'Non-fiction', 'Science', 'Fantasy'];

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

          setTimeout(() => {
            this.dialogRef.close(true);

            this.route.navigate(['book/list']);
          }, 500);
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

  onCloseDialog() {
    this.dialogRef.close();
  }
}
