import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  currentLoggedInUser: string | null;
  currentLoggedInUserRole: string | null;
  constructor(private http: HttpClient) {
    this.currentLoggedInUser = localStorage.getItem('token');
    this.currentLoggedInUserRole = localStorage.getItem('user');
  }

  getAllUsers(): Observable<any> {
    let userRole: string | null;
    const currentUserData = this.currentLoggedInUserRole;
    if (currentUserData) {
      let parsedUser = JSON.parse(currentUserData);
      userRole = parsedUser.role;
    }
    console.log(currentUserData);
    return this.http.get(`${this.apiUrl}/user`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  updateUser(id: string, data: any): Observable<any> {
    console.log('Data being sent to the server:', data);
    return this.http.put(`${this.apiUrl}/user/update-user/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/delete-user/${id}`);
  }

  getCurrentUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`);
  }


}
