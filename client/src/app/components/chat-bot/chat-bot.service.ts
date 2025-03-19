import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = `${environment.apiUrl}/gemini/ask`;

  constructor(private http: HttpClient) {}

  askGemini(query: string): Observable<any> {
    return this.http.post(this.apiUrl, { query });
  }
}
