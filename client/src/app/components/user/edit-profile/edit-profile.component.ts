import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '../../../shared/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService, MessageService],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  profileImage: string | null = null;
  isAddressFormVisible = false;
  public currentLoggedUser: any;
  private userService = inject(UserService);
  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentLoggedUser = JSON.parse(userData);
    } else {
      console.error('User data is not found in localStorage.');
    }

    this.editProfileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [],
      userName: ['', [Validators.required]],
      profileImage: [null],
      street: [''],
      city: [''],
      state: [''],
      zipCode: [''],
    });
  }

  ngOnInit(): void {
    debugger;
    this.loadUserData();
  }

  loadUserData(): void {
    const userId = this.currentLoggedUser._id;
    this.userService.getUserById(userId).subscribe(
      (userData) => {
        this.editProfileForm.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          userName: userData.userName,
          email: userData.email,
          phone: userData.phone,
          street: userData.street || '',
          city: userData.city || '',
          state: userData.state || '',
          zipCode: userData.zipCode || '',
        });
        if (userData.profileImage) {
          this.profileImage = userData.profileImage;
        }
      },
      (error) => {
        // this.toastr.error('Error fetching user data.');
      }
    );
  }

  showAddressForm(): void {
    this.isAddressFormVisible = true;
  }

  cancelEdit(): void {
    this.router.navigate(['/profile']);
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
        this.editProfileForm.patchValue({
          profileImage: file,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to update your profile?',
      header: 'Profile Update Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.editProfileForm.valid) {
          const updatedData = this.editProfileForm.value;
          const formData = new FormData();

          for (const key in updatedData) {
            if (updatedData[key]) {
              formData.append(key, updatedData[key]);
            }
          }

          this.userService
            .updateUser(this.currentLoggedUser._id, formData)
            .subscribe({
              next: (response) => {
                this.profileImage = response.profileImage;
                this.router.navigate(['user/edit-profile']);

                this.messageService.add({
                  severity: 'success',
                  summary: 'Profile Updated',
                  detail: 'Your profile has been updated successfully.',
                  life: 3000,
                });
              },
              error: (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Update Failed',
                  detail: 'Failed to update your profile.',
                  life: 3000,
                });
              },
            });
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Update Canceled',
          detail: 'You have canceled the profile update.',
          life: 3000,
        });
      },
    });
  }
}
