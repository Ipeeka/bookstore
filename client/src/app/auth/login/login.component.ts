import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    CardModule,
    RouterLink,
    ToastModule,
    ForgotPasswordComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email: string = '';
  password: string = '';
  isForgotPassword: boolean = false;

  private loginService = inject(AuthService);
  private route = inject(Router);
  private messageService = inject(MessageService);

  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.getLoginForm();
  }

  getLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  showForgotPassword() {
    this.isForgotPassword = true; 
  }

  onBackToLogin() {
    this.isForgotPassword = false; 
  }
  onLogin() {
    try {
      if (this.loginForm.valid) {
        const saveSubscribe = this.loginService
          .login(this.loginForm.value)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Login Successful',
                detail: 'Welcome Back',
                life: 1000,
              });

              setTimeout(() => {
                if (this.loginService.currentUserSubject().role == 'admin') {
                  this.route.navigateByUrl('book/list');
                } else {
                  this.route.navigateByUrl('book/list');
                }

                this.loginForm.reset();
              }, 1000);
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail:
                  err?.error?.message ||
                  'Something went wrong. Please try again later.',
              });
            },
          });
        this.unsubscribe.push(saveSubscribe);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation Error',
          detail: 'Please fill in all required fields',
        });
      }
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Unexpected Error',
        detail: err || 'An unexpected error occurred',
      });
    }
  }
}
