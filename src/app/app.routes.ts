import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'user', loadChildren: ()=> import('./modules/user/user.module').then(m => m.UserModule)},
    { path: 'admin', loadChildren: ()=> import('./modules/admin/admin.module').then(m => m.AdminModule)},

];
