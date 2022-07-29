import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/ShoppingCardItem';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/products/app.state';
import { getAllOrders } from '../store/shoppigCart/shoppingCart.selectors';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent  {

  constructor(
    private productService:ProductService,
    private router:Router,
    private store:Store<AppState>
  ) { }

  items:ShoppingCartItem[]=[]
  orders$=this.store.select(getAllOrders)


  redirect(id:number):void{
    this.router.navigate(['/productDetails',id])
  }

}
