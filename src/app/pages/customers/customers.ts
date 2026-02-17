import { Component } from '@angular/core';
import { Api } from '../../core/services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [FormsModule,CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
customers: any[] = [];
  newCustomer: any = {};

  constructor(private api: Api) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.api.getCustomers().subscribe((res: any) => {
      this.customers = res;
    });
  }

  addCustomer() {
    this.api.addCustomer(this.newCustomer).subscribe(() => {
      this.newCustomer = {};
      this.loadCustomers();
    });
  }
}
