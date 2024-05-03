import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Trends } from '../../interfaces/trends';
import { ProductService } from '../../services/product.service';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from '../../interfaces/category';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../../interfaces/product';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,FormsModule,DropdownModule,
    CardModule,ReactiveFormsModule,FileUploadModule,ToastModule,InputTextareaModule,InputTextModule],
  providers: [MessageService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  imageName:string = "";
  adminForm = this.fb.group({
    title: ['',[Validators.required]],
    description: ['',[Validators.required]],
    productCategory : ['',[Validators.required]],
    price : [0,[Validators.required]],
    discountPercentage : [0,[Validators.required]],
    rating : [0,[Validators.required]]
  });
  selectedCategory:{
    id:number,
    name:string
  } = {id: 1,name:""};
  Trends$:Observable<Trends[]> = new Observable<Trends[]>();  
  Categories$:Observable<Category[]> = new Observable<Category[]>();
  categoryArr: Category[] = [{name: 'Select Category',code: -1}];

  constructor(private router:Router,private fb:FormBuilder,private messageService:MessageService,private productService:ProductService){
 
  }

  get title() {
    return this.adminForm.controls['title'];
  }

  get description() {
    return this.adminForm.controls['description'];
  }

  get productCategory() {
    return this.adminForm.controls['productCategory'];
  }
  
  get price() {
    return this.adminForm.controls['price'];
  }

  get discountPercentage() {
    return this.adminForm.controls['discountPercentage'];
  }

  get rating() {
    return this.adminForm.controls['rating'];
  }



  ngOnInit(): void {
    this.Trends$ = this.productService.getAllTrends();
    this.Categories$ = this.productService.getCategories().pipe(
      map((categories) => {
        categories.map((category,index) => {
          let obj:Category = {            
            name: category,
            code: index 
          }
          this.categoryArr.push(obj);
        })
        return this.categoryArr
      })       
    );
  }

  onAddProduct(){
    let newProduct:Product;
    newProduct = this.adminForm.value
    newProduct.category = this.selectedCategory.name;
    //newProduct.category = this.selectedCategory.name;
    const userData = this.adminForm.value;
    this.productService.addProduct(newProduct).subscribe((res) => {
      this.adminForm.reset();
      this.imageName = "";
      this.showSuccess("Product has been added successfully !")
    })
  }

  onBasicUploadAuto(event:any){
    this.imageName = event.files[0].name;
  }

  showError(msg:string){
    this.messageService.add({severity: 'error',summary:'Error Message', detail:msg})
  }

  showSuccess(msg:string){
    this.messageService.add({severity: 'success',summary:'New product added', detail:msg})
  }

  onBackClick(){
    this.router.navigate(['/dashboard']);
  }

}
