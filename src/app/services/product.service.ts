import { Injectable } from '@angular/core';
import { Observable, map, mergeMap } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http'; 
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,private loadingService:LoadingService) { }

  getProducts(): Observable<Product[]>{
      return this.http.get<Product[]>("https://dummyjson.com/products").pipe(
        map((product:any) =>{
          this.loadingService.hideProgressSpinner();
            return product["products"];
        })
      )
  } 
   
}
