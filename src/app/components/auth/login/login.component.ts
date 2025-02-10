import { Component } from '@angular/core';
import { SharedModule } from '../../../modules/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../services/user-storage.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  
    constructor(private fb: FormBuilder,
      private authService: AuthService,
      private message: NzMessageService,
      private router: Router
    ){}
  
    ngOnInit(){
      this.loginForm = this.fb.group({
        email: [null, Validators.required],
        password: [null, Validators.required]
      })
    }
  
    submitForm(){
      this.authService.login(this.loginForm.value).subscribe(res=>{
        this.message
        .success(
          `Logging in!`,
          {nzDuration: 5000}
        );
        const user = {
          id: res.id,
          role: res.role
        }
        UserStorageService.saveUser(user);

        if(UserStorageService.isAdmin){
          this.router.navigateByUrl('/admin/dashboard');
        } else if(UserStorageService.isUser){
          this.router.navigateByUrl('user/profile');
        }
      }, error=>{
        this.message
        .error(
          `Bad credentials!`,
          {nzDuration: 5000}
        );
      })
    }

}
