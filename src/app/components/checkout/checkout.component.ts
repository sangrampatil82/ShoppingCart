import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Observable } from 'rxjs';
import { Trends } from '../../interfaces/trends';
import { Address } from '../../interfaces/address';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CardModule,
    RadioButtonModule,AsyncPipe,CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  addresses:Address[];
  selectedAddress:string;
  Trends$:Observable<Trends[]> = new Observable<Trends[]>();
  orderPlaced:boolean;

  constructor(private route:ActivatedRoute, private productService:ProductService, private router:Router,public cartService:CartService){
    
  }

  ngOnInit(): void {
    this.addresses = [
      {
        id: 1,
        address: '936 Kiehn Route,West Ned,Tennessee,11230 '
      },
      {
        id: 2,
        address: 'Dilli Haat Pitampura, Near Netaji Subhash Place Metro Station,Delhi,110052'
      },
      {
        id: 3,
        address: 'Thorsten-Busse-Platz 4,Friedrichsdorf,Baden-Wurttemberg,73556'
      }      
    ]
    this.Trends$ = this.productService.getAllTrends();
  }

  onBackClick(){
    if(this.orderPlaced){
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/cart']);
    }
    
  }

  placeOrder(){    
    this.router.navigate(['/payment'])
  }

}
