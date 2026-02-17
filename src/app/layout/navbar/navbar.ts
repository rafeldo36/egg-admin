import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../../core/services/api';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Output() toggle = new EventEmitter<void>();


  constructor(
    private api: Api,
    private router: Router
  ) { }

  logout() {
    this.api.logout();
    this.router.navigate(['/login']);
  }
}
