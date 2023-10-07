import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core';
import { AuthenticationServices } from '../../services/authentication.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user!: any;

  constructor(private authenticationService: AuthenticationServices) { }

  ngOnInit() {


    this.authenticationService.getUser()
      .subscribe(user => {
        this.user = user;
        console.log('sign in', user)
      })


  }


  onLogout() {
    this.authenticationService.signOut();
    console.log('sign out: ', this.user)
  }
}
