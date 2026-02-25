import { Component } from '@angular/core';
import { Api } from '../../core/services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  imports: [FormsModule,CommonModule],
  templateUrl: './payments.html',
  styleUrl: './payments.scss',
})
export class Payments {
  customers: any[] = [];
  payment: any = {};
  successMessage = '';
  errorMessage = '';
  payments: any[] = [];
  filterRange: 'today' | 'month' | 'year' = 'today';

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getCustomers().subscribe((res: any) => {
      this.customers = res;
    });

    this.loadPayments();
  }

  addPayment() {
    this.successMessage = '';
    this.errorMessage = '';

    this.api.addPayment(this.payment).subscribe({
      next: () => {
        this.payment = {};
        this.successMessage = 'Payment recorded successfully.';
        this.loadPayments();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Unable to record payment.';
      }
    });
  }

  setRange(range: 'today' | 'month' | 'year') {
    this.filterRange = range;
    this.loadPayments();
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

  private loadPayments() {
    const { from, to } = this.getRange();
    this.api.getPayments(true).subscribe((res: any) => {
      this.payments = res;
    });
  }

  deletePayment(id: string) {
    if (!confirm('Delete this payment record? Customer balance will be adjusted back.')) {
      return;
    }
    this.api.deletePayment(id).subscribe(() => {
      this.loadPayments();
    });
  }
}
