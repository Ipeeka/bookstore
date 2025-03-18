import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {  provideLottieOptions } from 'ngx-lottie';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig, // Spread your appConfig correctly
  providers: [
    ...appConfig.providers, // Ensure existing providers are included
    provideAnimations(),
    provideLottieOptions({
      player: () => import('lottie-web') // Lazy-load lottie-web
    }),
  ],
}).catch((err) => console.error(err));
