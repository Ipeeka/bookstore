import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service'; 

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FloatLabelModule, ReactiveFormsModule, ButtonModule, InputOtpModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm!: FormGroup;
  otpSent: boolean = false;
  resendTimeout: number = 30;
  otpTimer: any;

  constructor(private fb: FormBuilder, private userService: UserService,private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: [''],
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      if (this.otpSent && this.forgotPasswordForm.get('otp')?.valid) {
        console.log('OTP Submitted:', this.forgotPasswordForm.get('otp')?.value);
        this.verifyOtp();
      } else if (!this.otpSent) {
        this.sendOtp();
      }
    } else {
      console.log('Form is not valid');
    }
  }

  // Send OTP to the user's email
  sendOtp() {
    const email = this.forgotPasswordForm.value.email;
    console.log(`Sending OTP to ${email}`);
    this.userService.sendOtp(email).subscribe(
      (response) => {
        debugger
        console.log(response); 
        this.otpSent = true;
        this.startOtpTimer();
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error(error);
        alert('Error sending OTP. Please try again later.');
      }
    );
  }

  // Verify the OTP entered by the user
  verifyOtp() {
    const otp = this.forgotPasswordForm.get('otp')?.value;
    const email = this.forgotPasswordForm.value.email;
    this.userService.verifyOtp(email, otp).subscribe(
      (response) => {
        console.log('OTP verified successfully', response);
        // Handle further action after successful OTP verification (e.g., navigate to reset password page)
      },
      (error) => {
        console.error(error);
        // Display error to user
        alert('Invalid OTP. Please try again.');
      }
    );
  }

  // Resend OTP if the timeout has elapsed
  onResendOtp() {
    if (this.resendTimeout <= 0) {
      console.log('Resending OTP...');
      this.sendOtp();
    }
  }

  // Start the OTP timer for resend functionality
  startOtpTimer() {
    this.resendTimeout = 30;
    this.otpTimer = setInterval(() => {
      if (this.resendTimeout > 0) {
        this.resendTimeout--;
      }
    }, 1000);
  }

  // Go back to the login page
  onBackToLogin() {
    window.history.back();
  }

  ngOnDestroy() {
    if (this.otpTimer) {
      clearInterval(this.otpTimer);
    }
  }
}
