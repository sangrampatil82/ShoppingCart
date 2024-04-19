import { Component } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable, map } from 'rxjs';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,InputTextModule,ButtonModule,CommonModule,ReactiveFormsModule,HeaderComponent
  ,SidebarComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   User$: Observable<User[]> = new Observable<User[]>()
  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required]]
  })

  constructor(private fb:FormBuilder, private authService:AuthService,private router:Router) { } 

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  onSubmit( ){
    console.log(this.loginForm.valid)
    this.authService.getUser().pipe(
      map((user) => {
          return user.find((user) => user.email == this.loginForm.controls['email'].value)
      })
    ).subscribe((user) => {
      if(user){
        this.router.navigate(["/dashboard"])
      }
    })
      
  }

}
