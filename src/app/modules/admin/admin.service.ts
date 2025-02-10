import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Error message:', error.error.message);
    } else {
      console.error(`Server returned code: ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }

  getUsers() {
    return this.http.get('/api/users').pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: any) {
    return this.http.post('/api/users', user).pipe(
      catchError(this.handleError)
    );
  }

  editUser(id: string, user: any) {
    return this.http.put(`/api/users/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`/api/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  makeAdmin(id: string) {
    return this.http.patch(`/api/users/${id}/make-admin`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getRequests() {
    return this.http.get('/api/requests').pipe(
      catchError(this.handleError)
    );
  }

  addRequest(request: any) {
    return this.http.post('/api/requests', request).pipe(
      catchError(this.handleError)
    );
  }

  editRequest(id: string, request: any) {
    return this.http.put(`/api/requests/${id}`, request).pipe(
      catchError(this.handleError)
    );
  }

  deleteRequest(id: string) {
    return this.http.delete(`/api/requests/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  approveRequest(id: string) {
    return this.http.patch(`/api/requests/${id}/status`, { status: 'APPROVED' }).pipe(
      catchError(this.handleError)
    );
  }

  rejectRequest(id: string) {
    return this.http.patch(`/api/requests/${id}/status`, { status: 'REJECTED' }).pipe(
      catchError(this.handleError)
    );
  }

  getRequestById(id: string) {
    return this.http.get(`/api/requests/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
