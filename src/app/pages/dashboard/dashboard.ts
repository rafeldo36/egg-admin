import { Component } from '@angular/core';
import { Api } from '../../core/services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  totalSales = 0;
  totalProfit = 0;

  purchasedStock = 0;
  suppliedStock = 0;
  remainingStock = 0;

  todaySales = 0;
  todayProfit = 0;
  monthSales = 0;
  monthProfit = 0;
  yearSales = 0;
  yearProfit = 0;

  get maxSales() {
    return Math.max(this.todaySales, this.monthSales, this.yearSales, 0);
  }

  constructor(private api: Api) { }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {

    this.api.getDashboardStats().subscribe((res: any) => {
      this.totalSales = res?.totalSales || 0;
      this.totalProfit = res?.totalProfit || 0;
    });

    this.api.getDashboardOverview().subscribe((res: any) => {
      this.todaySales = res?.today?.totalSales || 0;
      this.todayProfit = res?.today?.totalProfit || 0;

      this.monthSales = res?.month?.totalSales || 0;
      this.monthProfit = res?.month?.totalProfit || 0;

      this.yearSales = res?.year?.totalSales || 0;
      this.yearProfit = res?.year?.totalProfit || 0;
    });

    this.api.getTodayStock().subscribe((res: any) => {
      this.purchasedStock = res.produced;
      this.suppliedStock = res.supplied;
      this.remainingStock = res.remaining;

    });

  }
}
