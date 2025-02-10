import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './modules/shared/shared.module';
import { UserStorageService } from './services/user-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Autentica Demo';

  isUser: boolean = UserStorageService.isUser();
  isAdmin: boolean = UserStorageService.isAdmin();

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      this.isUser = UserStorageService.isUser();
      this.isAdmin = UserStorageService.isAdmin();
    })
  }

  logout(){
    UserStorageService.logout();
    this.router.navigateByUrl('/login');
  }
}
