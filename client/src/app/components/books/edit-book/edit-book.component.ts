import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';

export interface Book {
  _id: string;
  img: string;
  title: string;
  author: string;
  publicationYear: string;
  price: number;
  availability: boolean;
  genre: string;
  bookmarked: boolean;
  cartAdded: boolean;
  quantity: number;
  description: string;
  inventoryStatus: 'inStock' | 'lowStock' | 'preOrder' | 'outOfStock';
  publisher: string;
}

@Component({
  selector: 'edit-book',
  standalone: true,
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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    StepsModule,
    PanelModule,
    StepperModule,
    InputNumberModule,
    ConfirmDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService, MessageService],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;
  currentStep: number = 1;
  @Input() data: Book | null = null; 

  displayDialog: boolean = true
  genres: string[] = ['Fiction', 'Non-fiction', 'Science', 'Fantasy'];
  @Output() saveBook = new EventEmitter<boolean>();
  bookData: any = {};


  statuses: any[] = [
    { label: 'In Stock', value: 'inStock' },
    { label: 'Low Stock', value: 'lowStock' },
    { label: 'Pre-order', value: 'preOrder' },
    { label: 'Out of Stock', value: 'outOfStock' },
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService , private bookService: BookService, private confirmationService: ConfirmationService) {
    this.editBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationYear: [null, Validators.required],
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

  ngOnInit(): void {
    console.log('Received Book Data:', this.data);
  

    if (this.data) {
      this.editBookForm.patchValue({
         title: this.data.title,
         author: this.data.author,
         publicationYear: this.data.publicationYear,
         price: this.data.price,
         genre: this.data.genre,
         inventoryStatus: this.data.inventoryStatus,
         publisher: this.data.publisher,
         description: this.data.description,
         quantity: this.data.quantity,
      });
   } else {
      console.error('No book data received!');
   }
   
  }
  
  update(): void {

    if (this.editBookForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill all required fields correctly.',
        life: 3000,
      });
      return;
    }
  
    const updatedBook = { ...this.data, ...this.editBookForm.value };
    console.log('Updated Book:', updatedBook); 
  
    if (!updatedBook._id) {
      console.error('Book ID is missing!');
      return;
    }
  
    this.confirmationService.confirm({
      message: 'Are you sure you want to save the changes?',
      header: 'Confirm Update',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookService.updateBook(updatedBook._id, updatedBook).subscribe(
          (response) => {
            this.saveBook.emit(response);
            this.messageService.add({
              severity: 'success',
              summary: 'Book Updated',
              detail: 'The book has been successfully updated.',
              life: 3000,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: 'Error updating book: ' + (error?.message || 'Unknown error'),
              life: 3000,
            });
          }
        );
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
  }

  onNextClick() {
    if (this.currentStep === 1) {
      this.currentStep = 2;
    } else {
      this.update();
    }
  }

  onPreviousClick() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }
}
