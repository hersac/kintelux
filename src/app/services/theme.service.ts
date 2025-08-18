import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkMode.asObservable();

  constructor() {
    // Check if dark theme was previously set in localStorage
    const prefersDark = localStorage.getItem('darkTheme') === 'true';
    if (prefersDark) {
      this.setDarkMode(true);
    }
  }

  isDarkMode(): boolean {
    return this.darkMode.value;
  }

  setDarkMode(isDark: boolean): void {
    this.darkMode.next(isDark);
    localStorage.setItem('darkTheme', isDark.toString());
    document.body.classList.toggle('dark', isDark);
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.darkMode.value);
  }
}
