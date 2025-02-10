import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../modules/shared/shared.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ){}

  ngOnInit(){
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    })
  }

  submitForm(){
    this.authService.register(this.registerForm.value).subscribe(res=>{
      this.message
      .success(
        `New User Registered!`,
        {nzDuration: 5000}
      );
      this.router.navigateByUrl("/login");
    }, error=>{
      this.message
      .error(
        `${error.error}`,
        {nzDuration: 5000}
      );
    })
  }
}
