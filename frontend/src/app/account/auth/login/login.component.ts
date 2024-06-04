
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { AuthenticationResponse } from '../models/authentication-response';
import { VerificationRequest } from '../models/verification-request';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  error = '';
  returnUrl: string;
  loginForm: FormGroup;
  authResponse: AuthenticationResponse = {};
  otpCode = '';
  message = '';
  year: number = new Date().getFullYear();
  userService: UserService;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService:AuthentificationService , 
    userService:UserService ) {
      this.userService = userService;
     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    const formData = this.loginForm.value
    this.authService.login(formData)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.accessToken as string);
             localStorage.setItem('UserConnected', JSON.stringify({
            id: response.id,
            firstname: response.firstname,
            lastname: response.lastname,
            email: response.email,
            role: response.role,
            sexe:response.sexe
             }));

            switch (this.authResponse.role) {
                case 'ADMINISTRATEUR':
                  this.router.navigate(['/announcement_admin']);
                  break;

                case 'Parent':  
                  this.router.navigate(['announcement_parent']);
                  break;

                case 'Babysitter':
                  this.router.navigate(['/announcement_babysitter']);
                  break;

                default:
                  console.error('Rôle non reconnu :', this.authResponse.role);
                  break;
              }
          }
        },
        error: (err) => {
          console.error('Erreur lors de l\'authentification :', err.error.message);
          this.message = err.error.message;
        }
      }); 
  }




}
