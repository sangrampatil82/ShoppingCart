import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(username:string | null, password:string | null):Observable<User>{ 
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({        
      username: username,
      password: password,
      expiresInMins: 30, // optional, defaults to 60
    });

    return this.http.post<User>('https://dummyjson.com/auth/login',body,{'headers':headers});
  }

  isLoggedIn():boolean {
    const authenticationToken:string | null = localStorage.getItem('auth_token'); // get token from local storage
    if(authenticationToken){
      const payload = atob(authenticationToken.split('.')[1]);
      console.log("payload")
      console.log(payload)
      const parsedPayload = JSON.parse(payload);
      console.log("parsedPayload");
      console.log(parsedPayload)
      return  (parsedPayload.exp > Date.now() / 1000)? true: false // check if token is expired
    }
    return false;    
  }
  
}
