import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    CardModule,
    FloatLabelModule,
    ToastModule,
    CheckboxModule
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private route = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  registerForm!: FormGroup;
  email: string = '';
  userName: string = '';
  password: string = '';

  firstName: string = '';
  lastName: string = '';
  role: any[] = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.getRegisterForm();
  }

  getRegisterForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('user', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const saveSubscribe = this.authService
        .register(this.registerForm.value)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Registration Successful',
              detail:
                'You have been registered successfully. Redirecting to login page...',
              life: 1000,
            });

            setTimeout(() => {
              this.route.navigateByUrl('/login');
            }, 3000);

            this.registerForm.reset();
          },
          error: (err) => {
            const errorMessage =
              err?.error?.message ||
              'Something went wrong. Please try again later.';
            this.messageService.add({
              severity: 'error',
              summary: 'Registration Failed',
              detail: errorMessage,
              life: 3000,
            });
          },
        });
      this.unsubscribe.push(saveSubscribe);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Input',
        detail: 'Please fill in all required fields correctly',
        life: 3000,
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sub) => sub.unsubscribe());
  }
}
