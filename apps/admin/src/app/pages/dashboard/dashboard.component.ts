import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@munch/orders';
import { ProductsService } from '@munch/products';
import { UsersService } from '@munch/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  statistics: any [];
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}