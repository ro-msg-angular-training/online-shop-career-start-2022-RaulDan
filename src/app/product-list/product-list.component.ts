import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/Product';
import { Observable } from 'rxjs';

import { backendURL } from 'src/utils';
import { HttpClient } from '@angular/common/http';

import { ProductService } from '../Services/productService';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]> | undefined;
  
  constructor(private router: Router,
    private http:HttpClient,
    private productService:ProductService,
    public authService:AuthService
    ) { }

  show=false;

  // Toggle to show or not products from data base
  handleClick(){
    this.show=!this.show;
  }

  // Redirect to product details page of a product
  redirect(id:Number){
    this.router.navigate(['/productDetails',id])
  }

  // Add A Product To Data Base
  addProduct():void{
    this.router.navigate(['/addProduct'])
  }

  // Get all products from database
  ngOnInit(): void {

    this.products$=this.http.get<Product[]>(backendURL+'products');
  }

  isAdmin:string|null=sessionStorage.getItem('isAdmin');
  isUser:string|null=sessionStorage.getItem('isUser');
  isCustomer:string|null=sessionStorage.getItem('isCustomer');

}
