import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router){    
  }
  redirectToLogin(){
      this.router.navigate(['/login']);
      localStorage.removeItem('auth_token'); 
  }

}
