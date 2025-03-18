import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie'; 
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LottieComponent,CommonModule,RouterLink,MatButtonModule,MatTooltipModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  options: AnimationOptions = {
    path: 'https://lottie.host/d987597c-7676-4424-8817-7fca6dc1a33e/BVrFXsaeui.json',
    loop: true,
    autoplay: true
  };
}
