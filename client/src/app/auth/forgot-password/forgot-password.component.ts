import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required]  
    });
  }

 
  onSubmit() {
   
    console.log('Form Valid:', this.forgotPasswordForm.valid);
    console.log('Form Errors:', this.forgotPasswordForm.errors);
    
    if (this.forgotPasswordForm.valid && !this.otpSent) {

      this.onGetOtp();
    } else if (this.otpSent && this.forgotPasswordForm.get('otp')?.valid) {
    
      console.log('OTP Submitted:', this.forgotPasswordForm.get('otp')?.value);
    } else {
      console.log('Form is not valid');
    }
  }


  onGetOtp() {
    const email = this.forgotPasswordForm.value.email;
    console.log(`Sending OTP to ${email}`);
    this.otpSent = true;
    this.startOtpTimer(); 
  }

  
  onResendOtp() {
    if (this.resendTimeout <= 0) {
      console.log('Resending OTP...');
      this.forgotPasswordForm.get('otp')?.setValue(''); 
      this.startOtpTimer(); 
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
