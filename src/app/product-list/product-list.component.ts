import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/Product';
import { Observable } from 'rxjs';

import { backendURL } from 'src/utils';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]> | undefined;
  
  constructor(private router: Router,
    private http:HttpClient
    ) { }

  show=false;

  handleClick(){
    this.show=!this.show;
  }

  redirect(id:Number){
    this.router.navigate(['/productDetails',id])
  }

  

  ngOnInit(): void {

    this.products$=this.http.get<Product[]>(backendURL+'products');
  }

}
