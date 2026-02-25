import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Api {

  baseUrl = 'https://egg-backend-yyqg.onrender.com/api';
  // baseUrl = 'http://localhost:5000/api';

  private customers$?: Observable<any[]>;
  private supplies$?: Observable<any[]>;
  private payments$?: Observable<any[]>;
  private dashboardOverview$?: Observable<any>;

  constructor(private http: HttpClient) { }

  getCustomers(forceRefresh = false) {
    if (!this.customers$ || forceRefresh) {
      this.customers$ = this.http
        .get<any[]>(`${this.baseUrl}/customers`)
        .pipe(shareReplay(1));
    }
    return this.customers$;
  }

  addCustomer(data: any) {
    return this.http.post(`${this.baseUrl}/customers`, data);
  }

  updateCustomer(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/customers/${id}`, data);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${this.baseUrl}/customers/${id}`);
  }

  addSupply(data: any) {
    return this.http.post(`${this.baseUrl}/supply`, data);
  }

  getSupplies(forceRefresh = false) {
    if (!this.supplies$ || forceRefresh) {
      this.supplies$ = this.http
        .get<any[]>(`${this.baseUrl}/supply`)
        .pipe(shareReplay(1));
    }
    return this.supplies$;
  }

  deleteSupply(id: string) {
    return this.http.delete(`${this.baseUrl}/supply/${id}`);
  }

  addPayment(data: any) {
    return this.http.post(`${this.baseUrl}/payment`, data);
  }

  getPayments(forceRefresh = false) {
    if (!this.payments$ || forceRefresh) {
      this.payments$ = this.http
        .get<any[]>(`${this.baseUrl}/payment`)
        .pipe(shareReplay(1));
    }
    return this.payments$;
  }

  deletePayment(id: string) {
    return this.http.delete(`${this.baseUrl}/payment/${id}`);
  }

  getDashboardStats() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }

  getDashboardOverview() {
    if (!this.dashboardOverview$) {
      this.dashboardOverview$ = this.http
        .get(`${this.baseUrl}/dashboard/overview`)
        .pipe(shareReplay(1));
    }
    return this.dashboardOverview$;
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
