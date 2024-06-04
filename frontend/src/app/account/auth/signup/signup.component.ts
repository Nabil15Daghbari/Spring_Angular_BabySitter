import { AuthenticationResponse } from './../models/authentication-response';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { RegisterRequest } from '../models/register-request';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  message = '';
  otpCode = '';
  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  messageError='';
  verifiyEmail=false ;
  email:string

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
     private authService:AuthentificationService , private sharedImageService : SharedService) { }





  year: number = new Date().getFullYear();



  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role:[''],
      status:['En attente'],
      sexe:['', Validators.required],
    });
  }
   
  get f() { return this.signupForm.controls; }

 

  onSubmit() {
    this.message = '';
    const formData =  this.signupForm.value;
    this.authService.register(formData) 
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          this.router.navigate(['/account/login']);               
        }, 
        error: (err) => {
          console.error('Erreur lors de l inscription:', err.error.message);
          this.messageError = err.error.message;
        }
      });

  }

         
  isControlValid(controlName: string): boolean {
    const control = this.signupForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  
  isControlInvalid(controlName: string): boolean {
    const control = this.signupForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  
  isControlTouched(controlName): boolean {
    const control = this.signupForm.controls[controlName];
    return control.dirty || control.touched;
  }





}
