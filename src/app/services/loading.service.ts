import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();

  constructor() {
       
   }
   

   showProgressSpinner(){
      this._loading.next(true);
   }

   hideProgressSpinner(){
    this._loading.next(false);
   }
}
