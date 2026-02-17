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

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getCustomers().subscribe((res: any) => {
      this.customers = res;
    });
  }

  addSupply() {
    this.api.addSupply(this.supply).subscribe(() => {
      this.supply = {};
      alert("Supply Added");
    });
  }
}
