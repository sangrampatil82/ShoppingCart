import { Injectable } from '@angular/core';
import { Observable, concatMap, forkJoin, map, mergeMap, of, switchMap, take } from 'rxjs';
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

    let productObjLocalStr$ = localStorage.getItem('localProductObj');
      let productObjLocal$:ProductObject;
      if(productObjLocalStr$){
        productObjLocal$ = JSON.parse(productObjLocalStr$);
        
        console.log("productObjLocal$");
        console.log(productObjLocal$)
      }

    let updatedProducts = [];
      /* return this.http.get<ProductObject>("https://dummyjson.com/products").pipe(
        switchMap((originalProducts) => {
          return this.http.get<ProductObject>("./assets/data/Products.json").pipe(
            map((newProducts:any) => {
              updatedProducts = [...originalProducts.products,...newProducts.products];
               newProducts.products = updatedProducts;
               this.loadingService.hideProgressSpinner();
               return newProducts;               
            })
          );
        }), 
      ) */
      
        
      return this.http.get<ProductObject>("https://dummyjson.com/products").pipe(
        switchMap((originalProducts) => {
          return of(productObjLocal$).pipe(
            map((newProducts:any) => {
              updatedProducts = [...originalProducts.products,...newProducts.products];
               newProducts.products = updatedProducts;
               this.loadingService.hideProgressSpinner();
               return newProducts;               
            })
          );
        }), 
      )
  }

  getProductByCategory(category:string): Observable<ProductObject>{
    let updatedProducts = [];
      return this.http.get<ProductObject>("https://dummyjson.com/products/category/"+category).pipe(
        switchMap((originalProducts) => {
          return this.http.get<ProductObject>("./assets/data/Products.json").pipe(
            map((newProducts:any) => {
              let arr2 = newProducts.products.filter((product:Product) => product.category == category)
              updatedProducts = [...originalProducts.products,...arr2];
               newProducts.products = updatedProducts;
               this.loadingService.hideProgressSpinner();
               return newProducts;               
            })
          );
        }), 
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

  addProduct(product:Product){
    return this.http.post("https://dummyjson.com/products/add",product);
  }
   
   
}
