import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/books`;
  private apiUrls = `${environment.apiUrl}/books-detail`;

  constructor(private http: HttpClient) {}
  getBooks(filters: {
    genre?: string;
    available?: boolean;
    price?: number;
  }): Observable<any[]> {
   
    let params = new HttpParams();
    if (filters.genre) {
      params = params.set('genre', filters.genre);
    }
    if (filters.available !== undefined) {
      params = params.set('availability', filters.available.toString());
    }

    if (filters.price !== undefined) {
      
      params = params.set('price', filters.price);
    }

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  addBook(book: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/add`, book);
  }
  getAllBooks(filter?: {
    genre?: string;
    available?: boolean;
  }): Observable<any[]> {
    const params: any = {};
    if (filter?.genre) {
      params.genre = filter.genre;
    }
    if (filter?.available !== undefined) {
      params.available = filter.available;
    }
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  updateBook(id: string, book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  searchBooks(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  updateBookLikeDisLike(query: any) {
    const params = new HttpParams().set('query', query);
    return this.http.put<any>(`${this.apiUrls}`, { params });
  }

  getBookDetails() {
    return this.http.get<any[]>(this.apiUrls);
  }

  addBookDetails(bookDetail: any): Observable<any> {
  
    return this.http.post<any>(`${this.apiUrls}`, bookDetail);
  }

  toggleBookmark(
    id: string,
    currentBookmarkedStatus: boolean
  ): Observable<any> {
    const newBookmarkedStatus = !currentBookmarkedStatus;

    return this.http.put<any>(`${this.apiUrl}/${id}/bookmark`, {
      toggleBookmarked: newBookmarkedStatus,
    });
  }

  getBookmarkedBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bookmarked`);
  }
}
