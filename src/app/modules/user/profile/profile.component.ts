import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserStorageService } from '../../../services/user-storage.service';

@Component({
  selector: 'app-profile',
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userFormGroup!: FormGroup;
  editingUser: any = null;

  constructor(private http: HttpClient, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    const userId = UserStorageService.getUserId();
    console.log("Logged-in User ID:", userId); // Log to ensure the correct ID is retrieved
    
    if (userId) {
      this.fetchUser(userId);
    }

    this.userFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  fetchUser(userId: string) {
    this.http.get<any>(`http://localhost:8080/api/users/${userId}`).subscribe(
      (user) => {
        this.editingUser = user;
        console.log('Fetched user data:', user); // Log to check the fetched user data

        this.userFormGroup.setValue({
          name: user.name,
          email: user.email,
          password: user.password
        });

        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  saveUser() {
    if (this.userFormGroup.invalid) return;

    const updatedUser = this.userFormGroup.value;

    this.http.put(`http://localhost:8080/api/users/${this.editingUser.id}`, updatedUser).subscribe(
      () => {
        console.log('User updated successfully');
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
