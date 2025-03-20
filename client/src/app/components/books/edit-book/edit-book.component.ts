import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Inject,
  inject,
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
import {
  MAT_DIALOG_DATA,
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  available: boolean;
  publicationYear?: string;
  inventoryStatus?: string;
  publisher?: string;
  quantity?: number;
  description?: string;
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
    ConfirmDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService, MessageService],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  editBookForm!: FormGroup;
  currentStep: number = 1;

  displayDialog: boolean = false;
  bookData: any = {};
  @Output() updateBook = new EventEmitter<boolean>();

  statuses: any[] = [
    { label: 'In Stock', value: 'inStock' },
    { label: 'Low Stock', value: 'lowStock' },
    { label: 'Pre-order', value: 'preOrder' },
    { label: 'Out of Stock', value: 'outOfStock' },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private fb: FormBuilder,
    private bookService: BookService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log('Received Book Data:', this.data);
  
    if (!this.data) {
      console.error('No book data received!');
      return;
    }
  
    this.editBookForm = this.fb.group({
      title: [this.data.title, Validators.required],
      author: [this.data.author, Validators.required],
      publicationYear: [this.data.publicationYear, Validators.required],
      price: [
        this.data.price,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      genre: [this.data.genre, Validators.required],
      inventoryStatus: [this.data.inventoryStatus, Validators.required],
      publisher: [this.data.publisher, Validators.required],
      quantity: [this.data.quantity, [Validators.required, Validators.min(1)]],
      description: [this.data.description, Validators.required],
    });
  }
  openEditBookDialog(book: any) {
    this.bookData = { ...book };
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
  }

  saveBook() {
    console.log('Saving Book:', this.bookData);
    this.displayDialog = false;
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

    this.confirmationService.confirm({
      message: 'Are you sure you want to save the changes?',
      header: 'Confirm Update',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       
        const updatedBook = { ...this.data, ...this.editBookForm.value };

        this.bookService.updateBook(updatedBook._id, updatedBook).subscribe(
          (response) => {
            this.dialogRef.close(response);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Book updated successfully',
              life: 3000,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: 'Error updating book',
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

    this.dialogRef.close();
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
