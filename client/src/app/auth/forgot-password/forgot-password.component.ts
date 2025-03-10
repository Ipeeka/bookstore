import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputOtpModule } from 'primeng/inputotp';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FloatLabelModule, ReactiveFormsModule, ButtonModule, InputOtpModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm!: FormGroup;
  otpForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  resendTimeout: number = 30;
  otpTimer: any;

  constructor(private fb: FormBuilder, private userService: UserService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      if (this.otpSent && this.otpForm.valid) {
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
        this.cdRef.detectChanges();
      },
      (error) => {
        alert('Error sending OTP. Please try again.');
      }
    );
  }

  verifyOtp() {
    const email = this.forgotPasswordForm.value.email;
    const otp = this.otpForm.value.otp;
    this.userService.verifyOtp(email, otp).subscribe(
      () => {
        this.otpVerified = true;
      },
      (error) => {
        alert('Invalid OTP. Please try again.');
      }
    );
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;

      if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const email = this.forgotPasswordForm.value.email;
      const otp = this.otpForm.value.otp;

      this.userService.resetPassword(email, otp, newPassword).subscribe(
        () => {
          alert('Password updated successfully!');
          this.otpSent = false;
          this.otpVerified = false;
          this.forgotPasswordForm.reset();
          this.otpForm.reset();
          this.resetPasswordForm.reset();
        },
        (error) => {
          alert('Error updating password. Please try again.');
        }
      );
    }
  }

  startOtpTimer() {
    this.resendTimeout = 30;
    this.otpTimer = setInterval(() => {
      if (this.resendTimeout > 0) {
        this.resendTimeout--;
      }
    }, 1000);
  }

  onBackToLogin() {
    window.history.back();
  }

  ngOnDestroy() {
    if (this.otpTimer) {
      clearInterval(this.otpTimer);
    }
  }
}
