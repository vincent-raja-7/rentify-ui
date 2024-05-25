import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private router: Router) {}

  setLoginStatus(status: boolean){
    status? this.isLoggedIn = true: this.isLoggedIn=false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    const{routeConfig} = route;
    let {path}= routeConfig as Route;
    let token = sessionStorage.getItem("Token");
    if(token === null){
      this.router.navigate(['/login']);
      return false;
    }
    else
      return true;
  }
}
