import { Component } from '@angular/core';
import { AuthenticationServices } from 'src/app/core/services/authentication.services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;
  error!: string;

  constructor(private authenticationService: AuthenticationServices, private router: Router) { }

  onSubmit(form: NgForm) {
    this.authenticationService.login(form.value).subscribe({
      next: (response) => {
        this.authenticationService.setToken(response.body.token);
        this.authenticationService.setUser(response.body.user);
        this.router.navigateByUrl('/')
      },
      error: (response) => {
        this.error = response.error['error']
      }
    });
  }
}
