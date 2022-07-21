import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/ShoppingCardItem';
import { ProductService } from '../Services/productService';
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

  items:ShoppingCartItem[]=this.productService.items

  ngOnInit(): void {
  }

  redirect(id:Number):void{
    this.router.navigate(['/productDetails',id])
  }

}
