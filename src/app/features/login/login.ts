import { Component } from '@angular/core';
import { Api } from '../../core/services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
username = '';
  password = '';
  error = '';

  constructor(
    private auth: Api,
    private router: Router
  ) {}

  login() {
    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error.message;
      }
    });
  }
}