import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable, of } from 'rxjs';
import { Trends } from '../../interfaces/trends';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,AsyncPipe,
    FormsModule,CommonModule,CardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,AfterViewInit {
  Trends$:Observable<Trends[]> = new Observable<Trends[]>();
  addedProducts$:Observable<Product[]> = new Observable<Product[]>();
  totalProducts:number;
  constructor(private route:ActivatedRoute,  private productService:ProductService,private cartService:CartService){  }

  ngOnInit(): void {
    this.Trends$ = this.productService.getAllTrends();
    this.addedProducts$ = of(this.cartService.addedProducts);

    this.route.params.subscribe((params) => {
      console.log("route params");
      console.log(params)
    })
    
  }
  ngAfterViewInit(): void {
    /* this.cartService.countChanged.subscribe((total) => {
      this.totalProducts = total;
      console.log("this.totalProducts from cart=")
      console.log(this.totalProducts)
    })   */  
  }
}
