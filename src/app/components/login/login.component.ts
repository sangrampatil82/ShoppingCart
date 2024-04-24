import { Component } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common'; 
import { Observable, map } from 'rxjs';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { LoadingService } from '../../services/loading.service';
import { UserService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,InputTextModule,ButtonModule,
    CommonModule,ReactiveFormsModule,ToastModule,
    HeaderComponent,SidebarComponent,FooterComponent],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   User$: Observable<User[]> = new Observable<User[]>()
  loginForm = this.fb.group({
    email: ['',[Validators.required]],
    password: ['',[Validators.required]]
  })

  constructor(private fb:FormBuilder,
    private userService:UserService,
    private router:Router,
    private loadingService:LoadingService,
    private messageService:MessageService) { } 

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  } 

  onSubmit( ){
    let userId: string | null = this.loginForm.controls.email.value;
    let password: string | null = this.loginForm.controls.password.value;
    if(this.loginForm.valid){
      this.loadingService.showProgressSpinner();
      this.userService.getUser(userId,password)
      .subscribe({
        next: (user) => {
          if(user.token){
            localStorage.setItem('auth_token', user.token);
            if(userId)
            localStorage.setItem('userName', userId);
            this.loadingService.hideProgressSpinner();
            this.router.navigate(["/dashboard"])
          }
        },
        error: (error) => {
            this.loadingService.hideProgressSpinner();
            this.showError(error);
        }
      }
      )
    }
      
  }

  showError(msg:string){
    this.messageService.add({severity: 'error',summary:'Error Message', detail:msg})
  }

}
