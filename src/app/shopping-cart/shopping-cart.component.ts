import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/ShoppingCardItem';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private productService:ProductService,
    private router:Router
  ) { }

  items:ShoppingCartItem[]=[]

  ngOnInit(): void {
    this.items=this.productService.items
  }

  redirect(id:number):void{
    this.router.navigate(['/productDetails',id])
  }

}
