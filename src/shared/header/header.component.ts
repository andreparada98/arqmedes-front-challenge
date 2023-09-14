import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { public_route } from '../constants/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate([`${public_route.login}`]);
  }
}
