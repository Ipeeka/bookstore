import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject = signal<any | null>(null);
  apiUrl = environment.apiUrl;

  private route = inject(Router);
  private http = inject(HttpClient);

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.setCurrentUser(JSON.parse(user));
    }
  }

  login(user: any): Observable<any> {
    const url = this.apiUrl + '/auth/login';
    return this.http.post<any>(url, user).pipe(
      map((response) => {
        if (response.data) {
          this.setCurrentUser(response.data);
        }
      })
    );
  }

  setCurrentUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.set(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.set(null);
    this.route.navigateByUrl('/login');
  }

  register(data: any): Observable<any> {
    const url = this.apiUrl + '/auth/register';
    return this.http.post<any>(url, data);
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject();
    return user && user.role === 'admin';
  }
}
