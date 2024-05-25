import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AuthService } from './Services/auth.service';
import { RegisterComponent } from './views/register/register.component';
import { SellerDashboardComponent } from './views/seller-dashboard/seller-dashboard.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthService] },
  { path: 'sellerDashboard', component: SellerDashboardComponent, canActivate: [AuthService]},
  { path: '**', redirectTo: 'login' }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
