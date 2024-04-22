import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { MessageService } from 'primeng/api';


export const globalInterceptor: HttpInterceptorFn = (req, next) => {  
  const  authenticationToken = localStorage.getItem('auth_token')
  const loadingService = inject(LoadingService); 
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authenticationToken}`
    }
  });
  
  return next(authReq).pipe(
    catchError((error) => {
      // todo: log?

      if (error.status != 200) {
          loadingService.hideProgressSpinner(); 
      }  

      return throwError(() => new Error('Unauthorized Exception'));
  })
  );


};
