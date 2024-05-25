import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiServiceService, private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      userType: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      let userDetais = {
        userName: this.registerForm.controls.username.value,
        userPassword: this.registerForm.controls.password.value,
        firstName: this.registerForm.controls.firstname.value,
        lastName: this.registerForm.controls.lastname.value,
        email: this.registerForm.controls.email.value,
        phoneNumber: this.registerForm.controls.phonenumber.value,
      }
      this.apiService.registerUser(userDetais, this.registerForm.controls.userType.value).subscribe((res)=>{
        this.router.navigate(["/login"]);
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
