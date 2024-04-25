import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public addedProducts:Product[] = [];
  public totalProducts:number=0;

  constructor() { }

   

}
