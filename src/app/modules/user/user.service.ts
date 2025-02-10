import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  // Get the currently logged-in user (fetch profile by id)
  getUserProfile(id: string) {
    return this.http.get(`/api/users/${id}`);
  }

  // Update the currently logged-in user's profile
  updateUserProfile(id: string, user: any) {
    return this.http.put(`/api/users/${id}`, user);
  }

  // Create a new request (user can submit new requests)
  addRequest(request: any) {
    return this.http.post('/api/requests', request);
  }

  // Get all requests by the current user (GET only the user's requests)
  getUserRequests(userId: string) {
    return this.http.get(`/api/requests?userId=${userId}`);
  }

  // Get a specific request by ID (user can fetch their specific request)
  getRequestById(id: string) {
    return this.http.get(`/api/requests/${id}`);
  }

  // Update a specific request (user can update their own request)
  updateRequest(id: string, request: any) {
    return this.http.put(`/api/requests/${id}`, request);
  }

  // Delete a request by ID (user can delete their own request)
  deleteRequest(id: string) {
    return this.http.delete(`/api/requests/${id}`);
  }
}
