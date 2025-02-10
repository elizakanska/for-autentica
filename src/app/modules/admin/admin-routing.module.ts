import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { RequestComponent } from './requests/requests.component';

const routes: Routes = [
  {path: 'dashboard', component: AdminDashboardComponent},
  {path: 'requests', component: RequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
