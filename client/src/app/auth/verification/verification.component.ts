import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {
  countdown: number = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCountdown();
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
