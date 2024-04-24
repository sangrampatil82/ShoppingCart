import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardModule } from 'primeng/card';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Observable, map,of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { ToastModule } from 'primeng/toast'; 
import { MessageService } from 'primeng/api'; 
import { ProductObject } from '../../interfaces/product-object';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,ToastModule,
    FooterComponent,CardModule,AsyncPipe,CommonModule],
    providers: [MessageService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
 
   productObj$:Observable<ProductObject> = new Observable<ProductObject>
  constructor(private productService:ProductService,private loadingService:LoadingService){

  }

  run(){
    this.loadingService.showProgressSpinner();
    this.productObj$ = this.productService.getAllProducts();
  }

    

}
