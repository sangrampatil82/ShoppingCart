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
import {environment} from '../../config/environment';
import { ProductObject } from '../../interfaces/product-object';
 

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
  role:string | null = localStorage.getItem('role');
  selectedCategoryString:string;
  imageName:string = "";
  imagePathFordashboard:string = ""
  adminForm = this.fb.group({
    title: ['',[Validators.required]],
    description: ['',[Validators.required]],
    price : [0,[Validators.required]],
    discountPercentage : [0,[Validators.required]],
    rating : [0,[Validators.required]],
    stock : [0,[Validators.required]],
    brand : ['',[Validators.required]],    
    category : ['',[Validators.required]]
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

  get category() {
    return this.adminForm.controls['category'];
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

  get stock() {
    return this.adminForm.controls['stock'];
  }

  get brand() {
    return this.adminForm.controls['brand'];
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
    let categoryObject = this.selectedCategory.name 
    let userData:any;
    let localProductObj:ProductObject;
    let localProductObjString = localStorage.getItem('localProductObj');  
     
    if(localProductObjString){
      localProductObj = JSON.parse(localProductObjString);
      userData = {
        id: 101,
        title: this.adminForm.controls['title'].value,
        description: this.adminForm.controls['description'].value,
        price: this.adminForm.controls['price'].value,
        discountPercentage: this.adminForm.controls['discountPercentage'].value,
        rating: this.adminForm.controls['rating'].value,
        stock: this.adminForm.controls['stock'].value,
        brand: this.adminForm.controls['brand'].value,
        category: this.selectedCategoryString,
        thumbnail: this.imagePathFordashboard,
        images: [],
        total: 10
      }
      localProductObj.products.push(userData)
      localStorage.setItem('localProductObj',JSON.stringify(localProductObj));
    }
    
    this.productService.addProduct(newProduct).subscribe((res) => {
      this.adminForm.reset();
      this.imageName = "";
      this.showSuccess("Product has been added successfully !")
    })
  }

  onBasicUploadAuto(event:any){
    const catValue:any = this.adminForm.controls.category.value;
    this.selectedCategoryString =  catValue.name;
    console.log(event)
    this.imageName = "../../../assets/images/"+catValue.name+"/"+ event.files[0].name;
    this.imagePathFordashboard = "./assets/images/"+catValue.name+"/"+ event.files[0].name;
  }

  onCategoryChange(event:any){
    console.log("category")
    console.log(event)
    this.selectedCategory.name = event.value     
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
