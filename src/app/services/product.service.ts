import { Injectable } from '@angular/core';
import { Observable, map, mergeMap } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http'; 
import { LoadingService } from './loading.service';
import { ProductObject } from '../interfaces/product-object';
import { Category } from '../interfaces/category';
import { Trends } from '../interfaces/trends';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient,private loadingService:LoadingService) { }

  getAllProducts(): Observable<ProductObject>{
      return this.http.get<ProductObject>("https://dummyjson.com/products").pipe(
        map((product:ProductObject) =>{
         this.loadingService.hideProgressSpinner();
            return product;
        })
      )
  }

  getProductByCategory(category:string): Observable<ProductObject>{
    return this.http.get<ProductObject>("https://dummyjson.com/products/category/"+category).pipe(
      map((product:ProductObject) =>{
       this.loadingService.hideProgressSpinner();
          return product;
      })
    )
  }

  getSingleProductOnSearch(product:String): Observable<ProductObject>{
    return this.http.get<ProductObject>("https://dummyjson.com/products/search?q="+product).pipe(
      map((product:ProductObject) =>{
       this.loadingService.hideProgressSpinner();
          return product;
      })
    )
  }
  
  getCategories():Observable<string[]>{
     return this.http.get<string[]>("https://dummyjson.com/products/categories");
  }

  getAllTrends():Observable<Trends[]>{
    return this.http.get<Trends[]>("./assets/data/Trends.json");
 }
   
   
}
