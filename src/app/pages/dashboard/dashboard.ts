import { Component } from '@angular/core';
import { Api } from '../../core/services/api';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  totalSales = 0;
  totalProfit = 0;

  purchasedStock = 0;
  suppliedStock = 0;
  remainingStock = 0;
  constructor(private api: Api) { }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {

    this.api.getDashboardStats().subscribe((res: any) => {
      this.totalSales = res?.totalSales || 0;
      this.totalProfit = res?.totalProfit || 0;
    });

    this.api.getTodayStock().subscribe((res: any) => {
      this.purchasedStock = res.produced;
      this.suppliedStock = res.supplied;
      this.remainingStock = res.remaining;

    });

  }
}
