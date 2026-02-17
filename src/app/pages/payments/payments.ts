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

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getCustomers().subscribe((res: any) => {
      this.customers = res;
    });
  }

  addPayment() {
    this.api.addPayment(this.payment).subscribe(() => {
      this.payment = {};
      alert("Payment Added");
    });
  }
}
