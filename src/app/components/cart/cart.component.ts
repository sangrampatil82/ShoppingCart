import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,AsyncPipe,
    FormsModule,CommonModule,CardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  Trends$:Observable<Trends[]> = new Observable<Trends[]>();
  addedProducts$:Observable<Product[]> = new Observable<Product[]>();
  totalProducts:number;
  cartTotal:number;
  constructor(private route:ActivatedRoute, private router:Router, 
    private cDetect:ChangeDetectorRef,  private productService:ProductService,public cartService:CartService){  }

  ngOnInit(): void {
    this.Trends$ = this.productService.getAllTrends();
    this.addedProducts$ = of(this.cartService.addedProducts);

    this.route.params.subscribe((params) => {
      console.log("route params");
      console.log(params)
    })
    this.calculateTotal()
  }

  removeFromCart(product:Product){
    let pId;
    this.cartService.addedProducts.map((cproduct,index) =>{
      if(cproduct.id == product.id){
        this.cartService.addedProducts.splice(index,1)
      }
    })
    this.calculateTotal();
  }

  calculateTotal(){
    let total:number=0;
    this.cartService.addedProducts.map((products) => {
      if(products.price){
        total += products.price * 83.37;        
      } 
        this.cartTotal = total;
    });
      
  }

  redirectToCheckout(){
    this.router.navigate(['/checkout']);
  }

  onBackClick(){
    this.router.navigate(['/dashboard']);
  }
}
