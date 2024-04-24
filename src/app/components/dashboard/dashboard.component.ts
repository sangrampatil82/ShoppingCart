import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardModule } from 'primeng/card';
import { ProductService } from '../../services/product.service'; 
import { Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map,mergeMap,of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { ToastModule } from 'primeng/toast'; 
import { MessageService } from 'primeng/api'; 
import { ProductObject } from '../../interfaces/product-object';
import { RouterLink, RouterOutlet } from '@angular/router';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';
import {InputTextModule} from 'primeng/inputtext';
import { Trends } from '../../interfaces/trends';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,ToastModule,
    FooterComponent,CardModule,AsyncPipe,CommonModule,FormsModule,
    DropdownModule,RouterOutlet,RouterLink,InputTextModule],
    providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
   
   searchInputStr:string="";
   productToSearch:string = "";
   selectedCategory:string = "";

   @ViewChildren('searchInput') querySearchInput:ElementRef[];

   productObj$:Observable<ProductObject> = new Observable<ProductObject>();
   Categories$:Observable<Category[]> = new Observable<Category[]>();
   Trends$:Observable<Trends[]> = new Observable<Trends[]>();
   categoryArr: Category[] = [{name: 'Select Category',code: 0}];

  constructor(private productService:ProductService,private loadingService:LoadingService){    
     
  }

  ngOnInit(): void {
    this.loadingService.showProgressSpinner();
    this.productObj$ = this.productService.getAllProducts();
    this.Categories$ = this.productService.getCategories().pipe(
      map((categories) => {
        categories.map((category,index) => {
          let obj:Category = {            
            name: category,
            code: index 
          }
          this.categoryArr.push(obj);
        })
        return this.categoryArr
      })       
    );
    this.Trends$ = this.productService.getAllTrends();   
  }

   
  ngAfterViewInit() { 
    this.querySearchInput.forEach((ref: ElementRef) => {
      fromEvent(ref.nativeElement, 'keyup')
        .pipe(
          map((event: any) => {
            console.log('event trigerrred', event);
            return event.target.value;
          }),
          filter(res => res.length > 2),
          debounceTime(2000), 
          distinctUntilChanged()
        )
        .subscribe((text: string) => {
          this.productObj$ = this.productService.getSingleProductOnSearch(text);
        });
    });
  }
     

  onCategoryChanged(event:DropdownChangeEvent){
    this.loadingService.showProgressSpinner();
    this.searchInputStr = "";
    this.productObj$ = this.productService.getProductByCategory(event.value.name);
  }

 
}
