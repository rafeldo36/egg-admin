import { Component } from '@angular/core';
import { Api } from '../../core/services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supply',
  imports: [FormsModule,CommonModule],
  templateUrl: './supply.html',
  styleUrl: './supply.scss',
})
export class Supply {
  customers: any[] = [];
  supply: any = {};
  successMessage = '';
  errorMessage = '';
  supplies: any[] = [];
  filterRange: 'today' | 'month' | 'year' = 'today';

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getCustomers().subscribe((res: any) => {
      this.customers = res;
    });

    this.loadSupplies();
  }

  get totalAmount() {
    const trays = Number(this.supply.trays || 0);
    const rate = Number(this.supply.ratePerTray || 0);
    return trays * rate;
  }

  get estimatedProfit() {
    const trays = Number(this.supply.trays || 0);
    const rate = Number(this.supply.ratePerTray || 0);
    const purchase = Number(this.supply.purchaseRatePerTray || 0);
    return (rate - purchase) * trays;
  }

  addSupply() {
    this.successMessage = '';
    this.errorMessage = '';

    this.api.addSupply(this.supply).subscribe({
      next: () => {
        this.supply = {};
        this.successMessage = 'Supply added successfully.';
        this.loadSupplies();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Unable to add supply.';
      }
    });
  }

  setRange(range: 'today' | 'month' | 'year') {
    this.filterRange = range;
    this.loadSupplies();
  }

  private getRange() {
    const now = new Date();
    let from: string | undefined;
    let to: string | undefined;

    if (this.filterRange === 'today') {
      const day = now.toISOString().split('T')[0];
      from = day;
      to = day;
    } else if (this.filterRange === 'month') {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      from = start.toISOString().split('T')[0];
      to = end.toISOString().split('T')[0];
    } else if (this.filterRange === 'year') {
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31);
      from = start.toISOString().split('T')[0];
      to = end.toISOString().split('T')[0];
    }

    return { from, to };
  }

  private loadSupplies() {
    const { from, to } = this.getRange();
    this.api.getSupplies(true).subscribe((res: any) => {
      this.supplies = res;
    });
  }

  deleteSupply(id: string) {
    if (!confirm('Delete this supply record? Stock and balance will be adjusted.')) {
      return;
    }
    this.api.deleteSupply(id).subscribe(() => {
      this.loadSupplies();
    });
  }
}
