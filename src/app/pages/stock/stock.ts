import { Component } from '@angular/core';
import { Api } from '../../core/services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock',
  imports: [FormsModule,CommonModule],
  templateUrl: './stock.html',
  styleUrl: './stock.scss',
})
export class Stock {
  productionQuantity = 0;

  produced = 0;
  supplied = 0;
  remaining = 0;
  history: any[] = [];

  constructor(private api: Api) { }

  loadHistory() {
    this.api.getStockHistory().subscribe((res: any) => {
      this.history = res;
    });
  }

  ngOnInit() {
    this.loadStock();
    this.loadHistory();
  }

  loadStock() {
    this.api.getTodayStock().subscribe((res: any) => {
      this.produced = res.produced;
      this.supplied = res.supplied;
      this.remaining = res.remaining;
    });
  }

  addProduction() {

  if (!this.productionQuantity) return;

  this.api.addProduction({
    quantity: this.productionQuantity
  }).subscribe(() => {

    this.productionQuantity = 0;
    this.loadStock();
    this.loadHistory();
  });
}

}
