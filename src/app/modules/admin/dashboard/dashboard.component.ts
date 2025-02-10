import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  showUserForm = false;
  editingUser: any = null;
  userFormGroup!: FormGroup;
  searchQuery: string = '';

  constructor(private http: HttpClient, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchUsers();
    this.userFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['USER', Validators.required]
    });
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:8080/api/users').subscribe(
      (data) => {
        this.users = Array.isArray(data) ? data : [];
        this.filteredUsers = [...this.users];
        this.cdRef.detectChanges();
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  searchUsers() {
    if (this.searchQuery.trim() === '') {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  openUserForm(user: any = null) {
    this.editingUser = user;
    this.userFormGroup.setValue(user ? { name: user.name, email: user.email, role: user.role } : { name: '', email: '', role: 'USER' });
    this.showUserForm = true;
  }

  closeUserForm() {
    this.showUserForm = false;
    this.editingUser = null;
  }

  saveUser() {
    if (this.userFormGroup.invalid) return;

    const request = this.editingUser
      ? this.http.put(`http://localhost:8080/api/users/${this.editingUser.id}`, this.userFormGroup.value)
      : this.http.post(`http://localhost:8080/api/users`, this.userFormGroup.value);

    request.subscribe(() => {
      this.fetchUsers();
      this.closeUserForm();
    });
  }

  editUser(user: any) {
    this.openUserForm(user);
  }

  deleteUser(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      this.http.delete(`http://localhost:8080/api/users/${id}`).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  makeAdmin(id: number) {
    this.http.patch(`http://localhost:8080/api/users/${id}/make-admin`, {}).subscribe(() => this.fetchUsers());
  }
}
