import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit,AfterViewInit{
  @Input() totalNumberProducts:number;
  userName:string | null = "";
  role:string | null = "";
  totalProducts:number=0;

  constructor(private router: Router,
    private loadingService: LoadingService,
    public cartService: CartService){   
  }

  ngOnInit(): void {    
    this.userName = localStorage.getItem('userName');
    this.role = localStorage.getItem('role');
  }

  ngAfterViewInit(): void {
    this.cartService.cartCountChanged.subscribe((total) => {
      this.cartService.totalProducts = total;
    })
  }
   
  redirectToLogin(){
      this.router.navigate(['/login']);
      this.loadingService.hideProgressSpinner();
      localStorage.removeItem('auth_token'); 
      localStorage.removeItem('totalProducts');
      localStorage.removeItem('selectedProducts'); 
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
  }

  onCartClick(){
    this.router.navigate(['/cart']);
  }

}
