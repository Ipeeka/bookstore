import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  profileImage: string =
    'https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png';
  isAddressFormVisible = false;
  public currentLoggedUser: any;
  private userService = inject(UserService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
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
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile(): void {
    if (this.editProfileForm.valid) {
      const updatedData = this.editProfileForm.value;

      if (this.profileImage) {
        updatedData.profileImage = this.profileImage;
      }

      this.userService
        .updateUser(this.currentLoggedUser._id, updatedData)
        .subscribe({
          next: () => {
            // this.toastr.success('Profile updated successfully.');
            this.router.navigate(['user/edit-profile']);
          },
          error: () => {
            // this.toastr.error('Failed to update profile.');
          },
        });
    }
  }
}
