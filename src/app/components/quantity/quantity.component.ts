import { Component, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'quantity',
  standalone: true,
  imports: [InputNumberModule,FormsModule],
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class QuantityComponent implements AfterViewInit {
  @Input() totalProducts?:number;
  @Input() productID:number;
  
  constructor(public cartService: CartService){}

  ngAfterViewInit(): void {
    this.cartService.cartCountChanged.subscribe((product:Product) => {
      this.totalProducts = product.total;
    })
  }

   public totalNum:number=0;
}
