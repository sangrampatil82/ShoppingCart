import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoadingService } from './services/loading.service';
import { AsyncPipe, CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,ProgressSpinnerModule,AsyncPipe,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ShoppingCart';

  loading$ = this.loadingService.loading$;

  constructor(private loadingService:LoadingService){

  }
}
