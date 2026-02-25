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
  isLoading = false;

  constructor(
    private auth: Api,
    private router: Router
  ) {}

  login() {
    if (!this.username || !this.password || this.isLoading) {
      return;
    }

    this.error = '';
    this.isLoading = true;

    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Unable to sign in. Please try again.';
        this.isLoading = false;
      }
    });
  }
}