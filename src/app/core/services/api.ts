import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Api {

  baseUrl = 'https://egg-backend-yyqg.onrender.com/api';
  // baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(`${this.baseUrl}/customers`);
  }

  addCustomer(data: any) {
    return this.http.post(`${this.baseUrl}/customers`, data);
  }

  addSupply(data: any) {
    return this.http.post(`${this.baseUrl}/supply`, data);
  }

  addPayment(data: any) {
    return this.http.post(`${this.baseUrl}/payment`, data);
  }

  getDashboardStats() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }

  getTodayStock() {
    return this.http.get(`${this.baseUrl}/stock/today`);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  addProduction(data: any) {
    return this.http.post(`${this.baseUrl}/stock/produce`, data);
  }

  getStockHistory() {
    return this.http.get(`${this.baseUrl}/stock/history`);
  }


}
