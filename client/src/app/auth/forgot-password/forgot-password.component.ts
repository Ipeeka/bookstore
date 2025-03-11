import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputOtpModule } from 'primeng/inputotp';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { PasswordModule } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FloatLabelModule, ReactiveFormsModule, ButtonModule, InputOtpModule, PasswordModule,ToastModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [MessageService],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm!: FormGroup;
  otpForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  resendTimeout: number = 15;
  otpTimer: any;

  @Output() backToLoginEvent = new EventEmitter<void>();

  private route = inject(Router);
  private messageService = inject(MessageService);

  constructor(private fb: FormBuilder, private userService: UserService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      if (this.otpSent && this.otpVerified) {
        this.resetPassword();
      } else if (this.otpSent && !this.otpVerified) {
        this.verifyOtp();
      } else if (!this.otpSent) {
        this.sendOtp(); 
      }
    }
  }

  sendOtp() {
    const email = this.forgotPasswordForm.value.email;
    this.userService.sendOtp(email).subscribe(
      () => {
        this.otpSent = true;
        this.startOtpTimer();
        this.forgotPasswordForm.addControl('otp', this.fb.control('', [Validators.required, Validators.pattern(/^\d{4}$/)]));
        this.cdRef.detectChanges();
        this.messageService.add({
          severity: 'success',
          summary: 'OTP Sent',
          detail: 'OTP has been sent to your email address.',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Sending OTP',
          detail: 'Error sending OTP. Please try again later.',
        });
      }
    );
  }

  verifyOtp() {
    const email = this.forgotPasswordForm.value.email;
    const otp = this.forgotPasswordForm.value.otp;
    this.userService.verifyOtp(email, otp).subscribe(
      () => {
        this.otpVerified = true;
        this.messageService.add({
          severity: 'success',
          summary: 'OTP Verified',
          detail: 'OTP successfully verified. You can now reset your password.',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid OTP',
          detail: 'The OTP you entered is invalid. Please try again.',
        });
      }
    );
  }
  resetPassword() {
    const { newPassword, confirmPassword } = this.forgotPasswordForm.value;
    if (newPassword !== confirmPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Password Mismatch',
        detail: 'Passwords do not match. Please try again.',
      });
      return;
    }

    const email = this.forgotPasswordForm.value.email;
    const otp = this.forgotPasswordForm.value.otp;

    this.userService.resetPassword(email, otp, newPassword).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Password Updated',
          detail: 'Your password has been successfully updated . You can login now..',
          life: 2000,
        });
        this.otpSent = false;
        this.otpVerified = false;
        this.forgotPasswordForm.reset();
        setTimeout(() => {
          this.backToLogin();
        }, 3000);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Updating Password',
          detail: 'There was an error updating your password. Please try again.',
        });
      }
    );
  }

  startOtpTimer() {
    this.resendTimeout = 15;
    this.otpTimer = setInterval(() => {
      if (this.resendTimeout > 0) {
        this.resendTimeout--;
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.otpTimer) {
      clearInterval(this.otpTimer);
    }
  }


  backToLogin() {
    this.backToLoginEvent.emit(); 
  }
}
