import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {
  countdown: number = 10;

  constructor(private router: Router,private route: ActivatedRoute,private authService: AuthService) {}
  token: string | null = null;
  verificationUrl: string = '';
  ngOnInit(): void {
   
    const hash = window.location.hash; 
    const token = new URLSearchParams(hash.replace('#', '')).get('token');
    console.log(token); 
    this.startCountdown();
    this.verifyEmail(token);
  }

  verifyEmail(token: any): void {
   
      const saveSubscribe = this.authService
        .verifyEmail(token)
        .subscribe({
          next: (response) => {
            console.log(response)
          }
        })
  }

  startCountdown() {
    const countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(countdownInterval); 
        this.redirectToLogin();
      }
    }, 1000); 
  }

  
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
