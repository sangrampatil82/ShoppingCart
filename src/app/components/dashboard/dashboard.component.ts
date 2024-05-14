import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardModule } from 'primeng/card';
import { ProductService } from '../../services/product.service'; 
import { Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map,mergeMap,of, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
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
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart.service'; 
import { Product } from '../../interfaces/product'; 
import { HttpClient } from '@angular/common/http';
import { SliderModule } from 'primeng/slider';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,ToastModule,ButtonModule,
    FooterComponent,CardModule,AsyncPipe,CommonModule,FormsModule,
    DropdownModule,RouterOutlet,RouterLink,InputTextModule,DecimalPipe,SliderModule],
    providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit {
   
  public searchInputStr:string="";
  public productToSearch:string = "";
  public selectedCategory:string = "";
  public selectedFilter:string = "";  
  public totalAddedProducts:number = 0;
  public rangeFromToText:number;
  public rangeValues:number[] = [1,10];
  
   @ViewChildren('searchInput') querySearchInput:ElementRef[];

   productObj$:Observable<ProductObject> = new Observable<ProductObject>();
   Categories$:Observable<Category[]> = new Observable<Category[]>();
   Trends$:Observable<Trends[]> = new Observable<Trends[]>();
   categoryArr: Category[] = [{name: 'Select Category',code: -1}];
   filterByOptions:Category[] = [];
   fromRange:number;
   toRange:number;
   selectedCode:number = -1;
   productObjLocal$:Observable<ProductObject>
   

  constructor(private productService:ProductService,
    public loadingService:LoadingService,
    public cartService:CartService,private http: HttpClient){   
     
  }

  ngOnInit(): void {
    let prodObj = {
      "products": [
        
      ]
    }
    if(!localStorage.getItem("localProductObj")){
      localStorage.setItem("localProductObj", JSON.stringify(prodObj));
    }
    
    window.scroll(0,0);
    this.loadingService.showProgressSpinner();
    this.resetProductsCategories();
    this.filterByOptions = [
      {name: 'Select Type',code: -1},
      {name:"Price (Low to High",code:0},
      {name:"Price (High to Low",code:1},
      {name:"By Range",code:2}
    ]
    
    this.Trends$ = this.productService.getAllTrends();   
  }

  resetProductsCategories(){
    this.selectedCategory = "";
    this.selectedFilter = "";
    this.selectedCode = -1;
    this.fromRange = 0;
    this.toRange = 0;
    this.productObj$ = this.productService.getAllProducts().pipe();
    this.Categories$ = this.productService.getCategories().pipe(
      map((categories) => {
        categories.map((category,index) => {
          let obj:Category = {            
            name: category,
            code: index 
          }
          this.categoryArr.push(obj);
        })
        console.log(this.categoryArr)
        return this.categoryArr
      })       
    );
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
          let updatedProducts:any = [];
          this.loadingService.showProgressSpinner();
          this.productObj$ = this.productService.getSingleProductOnSearch(text).pipe(
            switchMap((originalProducts) => {
              return this.http.get<ProductObject>("./assets/data/Products.json").pipe(
                map((newProducts:ProductObject) => {
                  let currentCatgeory = originalProducts.products[0].category;
                  let arr2 = newProducts.products.filter((product:any) => product.category == currentCatgeory)
                  updatedProducts = [...originalProducts.products,...arr2];
                  originalProducts.products = updatedProducts;
                   this.loadingService.hideProgressSpinner();
                   return originalProducts;               
                })
              );
            }),
          );
        });
    });
  }
     

  onCategoryChanged(event:DropdownChangeEvent){
    this.loadingService.showProgressSpinner();
    this.searchInputStr = "";
    if(event.value.code >=0)
      this.productObj$ = this.productService.getProductByCategory(event.value.name);
    else
      this.productObj$ = this.productService.getAllProducts();
  }

  onFilterChanged(event:DropdownChangeEvent){
    this.loadingService.showProgressSpinner();
    this.searchInputStr = "";
    let dataSource:Observable<ProductObject>;
    dataSource = (this.productObj$)?this.productObj$: this.productService.getAllProducts();    
    this.selectedCode = event.value.code;
    switch(event.value.code){
      case -1:
        this.loadingService.hideProgressSpinner();
        break;
      case 0:        
        this.productObj$ = dataSource.pipe(map((data) => {
          data.products.sort((a, b) => {
              return a.price < b.price ? -1 : 1;
           });
          return data;
          }));
        break;
      case 1:        
        this.productObj$ = dataSource.pipe(map((data) => {
          data.products.sort((a, b) => {
              return a.price > b.price ? -1 : 1;
           });
          return data;
          }));
        break;
      
        case 2:
          this.loadingService.hideProgressSpinner();
          break;
      }
  }

  onRangeGo(){
    this.loadingService.showProgressSpinner();
    this.productObj$ = this.selectBetween(this.fromRange,this.toRange);    
  }

  selectBetween(start: number, end: number): Observable<ProductObject> {
    return this.productObj$.pipe(
      map((originalProducts) => {
        let updatedProducts:any = [];
        originalProducts.products.map((products) => {
          if(products.price >= start && products.price <= end){
            updatedProducts.push(products);
          }
        });
         
        originalProducts.products = updatedProducts;
        originalProducts.products.sort((a, b) => {
          return a.price < b.price ? -1 : 1;
        });
        return originalProducts;
        })
    );
  }

  addToCart(product:Product){
    this.totalAddedProducts++;
    this.cartService.addedProducts.push(product);
    this.cartService.cartCountChanged.next(this.totalAddedProducts);
  }

}
