import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map } from 'rxjs';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const userService = inject(UserService); 
  const router = inject(Router);
  const isLoggedIn = userService.isLoggedIn();
  if(isLoggedIn){
    return true;
  }else{
    router.navigate(['/login']); 
    return false;
  }   
};
