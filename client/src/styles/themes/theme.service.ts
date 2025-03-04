import { Injectable } from '@angular/core';

export interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private lightTheme: ThemeColors = {
    primaryColor: '#2196F3',
    secondaryColor: '#FF4081',
    backgroundColor: '#FFFFFF',
    fontColor: '#000000',
  };

  private darkTheme: ThemeColors = {
    primaryColor: '#BB86FC',
    secondaryColor: '#03DAC6',
    backgroundColor: '#121212',
    fontColor: '#FFFFFF',
  };

  // Current theme
  private currentTheme: ThemeColors = this.lightTheme;

  // Get current theme
  get theme(): ThemeColors {
    return this.currentTheme;
  }

  // Switch to light theme
  switchToLightTheme() {
    this.currentTheme = this.lightTheme;
  }

  // Switch to dark theme
  switchToDarkTheme() {
    this.currentTheme = this.darkTheme;
  }
}
