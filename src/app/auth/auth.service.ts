import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor() {
    // Check if user is already logged in from localStorage
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn === 'true') {
      this.isAuthenticated.next(true);
    }
  }

  login(email: string, password: string): boolean {
    // In a real app, you would validate credentials against a backend
    // For this example, we'll just check that fields are not empty
    if (email && password) {
      this.isAuthenticated.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }
}
