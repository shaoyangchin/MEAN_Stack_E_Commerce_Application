import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartItem, CartService } from '@munch/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() product!: Product;
  endSubs$: Subject<any> = new Subject();
  quantity: number;

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  addProductToCart() {
    const Cart: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    if (Cart) {
      this.cartService.setCartItem(Cart);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${this.product.name} has been added to cart`,
        life: 2000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No product has been added to cart',
        life: 2000,
      });
    }
  }
}
