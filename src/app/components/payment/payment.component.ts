import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Observable } from 'rxjs';
import { Trends } from '../../interfaces/trends';

import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Payment } from '../../interfaces/payment';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HeaderComponent,InputTextModule,FooterComponent,CommonModule,
    FormsModule,RadioButtonModule,CardModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {  
  payments:Payment[];
  selectedPaymentType:string;
  paymentAddress:String;
  Trends$:Observable<Trends[]> = new Observable<Trends[]>();
  orderPlaced:boolean;


  constructor(private productService:ProductService,private router:Router,private cartService:CartService){

  }

  ngOnInit(): void {
    this.payments = [
      {
        id: 1,
        type: 'Google Pay'
      },
      {
        id: 2,
        type: 'Amazon Pay'
      },
      {
        id: 3,
        type: 'PhonePay'
      },
      {
        id: 4,
        type: 'Cash On Deleivery'
      },     
    ]
    this.Trends$ = this.productService.getAllTrends();
  }

  onBackClick(){
    this.router.navigate(['/dashboard']);
  }

  placeOrder(){
    this.orderPlaced = true;
    this.orderPlaced = true;
    this.cartService.addedProducts = [];
    this.cartService.cartCountChanged.next(0);
  }

}
