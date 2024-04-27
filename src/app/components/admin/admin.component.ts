import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Trends } from '../../interfaces/trends';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  Trends$:Observable<Trends[]> = new Observable<Trends[]>();

  constructor(private productService:ProductService){

  }

  ngOnInit(): void {
    this.Trends$ = this.productService.getAllTrends();
  }

}
