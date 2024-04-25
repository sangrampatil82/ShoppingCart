import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  @Input() totalNumberProducts:number;
  userName:string | null = "";
  totalProducts:number=0;

  constructor(private router: Router,
    private loadingService: LoadingService,
    public cartService: CartService){   
  }

  ngOnInit(): void {    
    this.userName = localStorage.getItem('userName');
  }

  
   

  redirectToLogin(){
      this.router.navigate(['/login']);
      this.loadingService.hideProgressSpinner();
      localStorage.removeItem('auth_token'); 
      localStorage.removeItem('totalProducts');
      localStorage.removeItem('selectedProducts'); 
  }

  onCartClick(){
    this.router.navigate(['/cart']);
  }

}
