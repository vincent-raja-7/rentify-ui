import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { AuthService } from 'src/app/Services/auth.service';
import { CommonService } from 'src/app/Services/common.service';
import { UserLoginDetails } from 'src/app/view-models/UserLoginDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiServiceService, private authService: AuthService
              ,private router: Router, private commonService: CommonService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let userLoginDetails: UserLoginDetails = {
        userName : this.loginForm.controls.username.value,
        userPassword: this.loginForm.controls.password.value
      }
      this.apiService.authenticateUser(userLoginDetails).subscribe((res)=>{
        sessionStorage.setItem("Token",res.jwtToken);
        this.commonService.setUserRole(res.user.role[0].roleName);
        this.authService.setLoginStatus(true);
        if(res.user.role[0].roleName === "Buyer")
          this.router.navigate(["/home"]);
        else
           this.router.navigate(["/sellerDashboard"]);
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  register(){
    this.router.navigate(["/register"]);
  }
}
