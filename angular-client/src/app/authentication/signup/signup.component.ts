import { Component } from '@angular/core';
import { AuthenticationServices } from 'src/app/core/services/authentication.services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  fullName!: string;
  email!: string;
  password!: string;
  error!: string;

  constructor(private authenticationService: AuthenticationServices, private router: Router) { }

  onSubmit(form: NgForm) {
    this.authenticationService.signup(form.value).subscribe({
      next: (response) => {

        this.router.navigateByUrl('/')
      },
      error: (response) => {
        this.error = response.error['error']
      }
    });
  }
}
