import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../shared/note';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // Define API
  apiURL = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch notes list
  getNotes(): Observable<Note> {
    return this.http
      .get<Note>(this.apiURL + '/notes')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch note
  getNote(id: any): Observable<Note> {
    return this.http
      .get<Note>(this.apiURL + '/noteById/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create note
  createNote(note: any): Observable<Note> {
    return this.http
      .post<Note>(
        this.apiURL + '/addNote',
        JSON.stringify(note),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update note
  updateNote(note: Note): Observable<Note> {
    return this.http
      .put<Note>(
        this.apiURL + '/update/',
        JSON.stringify(note),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete note
  deleteNote(id: any) {
    return this.http
      .delete<Note>(this.apiURL + '/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
