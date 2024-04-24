import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  userName:string | null = "";
  constructor(private router:Router, private loadingService:LoadingService){    
  }

  ngOnInit(): void {     
    this.userName = localStorage.getItem('userName')
  }

  redirectToLogin(){
      this.router.navigate(['/login']);
      this.loadingService.hideProgressSpinner();
      localStorage.removeItem('auth_token'); 
  }

}
