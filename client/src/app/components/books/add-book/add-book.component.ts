import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    CommonModule,
    RadioButtonModule,
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
    StepperModule,
    InputNumberModule,
  ],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;
  private bookService = inject(BookService);
  private route = inject(Router);
  statuses: any[] = [
    { label: 'In Stock', value: 'inStock' },
    { label: 'Low Stock', value: 'lowStock' },
    { label: 'Pre-order', value: 'preOrder' },
    { label: 'Out of Stock', value: 'outOfStock' },
  ];
  displayDialog: boolean = true;
  genres: string[] = ['Fiction', 'Non-fiction', 'Science', 'Fantasy'];
  currentStep: number = 1;
  @Output() saveBook = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationYearMonth: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)],
      ],
      genre: ['', Validators.required],

      inventoryStatus: ['', Validators.required],
      publisher: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, Validators.required],
    });
  }

  onMonthSelect(event: any) {
    // The event will contain a full Date object
    const selectedDate = event;
    const monthName = selectedDate.toLocaleString('default', { month: 'long' }); // Full month name (e.g., "January")
    const year = selectedDate.getFullYear(); // Get the year from the Date object
    
    // Set the value of publicationYearMonth in "Month YYYY" format
    this.addBookForm.controls['publicationYearMonth'].setValue(`${monthName} ${year}`);
  }
  ngOnInit() {}
  onSubmit() {
 
    if (this.addBookForm.valid) {
   
      const formValues = this.addBookForm.value;
      const book = {
        ...formValues,
        price: parseFloat(formValues.price),
        publicationYearMonth: formValues.publicationYearMonth,
      };

      this.bookService.addBook(book).subscribe(
        (response) => {
          console.log('Book added successfully', response);

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Book added successfully!',
          });
          this.saveBook.emit(true);
          setTimeout(() => {
            // this.dialogRef.close(true);
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
    // this.dialogRef.close();
  }

  onNextClick() {

    if (this.currentStep === 1) {
      this.currentStep = 2;
    }else{
      this.onSubmit()
    }
  }

  onPreviousClick() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }
}
