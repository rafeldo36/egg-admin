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
  searchTerm = '';
  editingId: string | null = null;

  constructor(private api: Api) {}

  ngOnInit() {
    this.loadCustomers();
  }

  get filteredCustomers() {
    if (!this.searchTerm) {
      return this.customers;
    }

    const term = this.searchTerm.toLowerCase();
    return this.customers.filter((c) =>
      (c.name || '').toLowerCase().includes(term) ||
      (c.type || '').toLowerCase().includes(term)
    );
  }

  loadCustomers() {
    this.api.getCustomers(true).subscribe((res: any) => {
      this.customers = res;
    });
  }

  saveCustomer() {
    if (this.editingId) {
      this.api.updateCustomer(this.editingId, this.newCustomer).subscribe(() => {
        this.resetForm();
        this.loadCustomers();
      });
    } else {
      this.api.addCustomer(this.newCustomer).subscribe(() => {
        this.resetForm();
        this.loadCustomers();
      });
    }
  }

  editCustomer(c: any) {
    this.editingId = c._id;
    this.newCustomer = {
      name: c.name,
      phone: c.phone,
      type: c.type,
      creditLimit: c.creditLimit
    };
  }

  deleteCustomer(id: string) {
    if (!confirm('Delete this customer?')) {
      return;
    }
    this.api.deleteCustomer(id).subscribe(() => {
      this.loadCustomers();
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.newCustomer = {};
    this.editingId = null;
  }
}
