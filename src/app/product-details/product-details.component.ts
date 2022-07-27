import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/Order';
import { ShoppingCartItem } from 'src/ShoppingCardItem';
import { AuthService } from '../Services/auth.service';
import { checkOut,deleteProduct,getProduct } from '../store/products/products.actions';
import { Store } from '@ngrx/store';
import { getSingleProduct } from '../store/products/products.selectors';
import { AppState } from '../store/products/app.state';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number = 0;
  item$=this.store.select(getSingleProduct)
  orders: Order[] = []
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store:Store<AppState>
  ) { }



  // Control edit form to appear or disappear
  show: boolean = false
  isAdmin: string | null = null
  isUser: string | null = null
  isCustomer: string | null = null

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!)// Get product id
    this.isAdmin = sessionStorage.getItem('isAdmin');
    this.isUser = sessionStorage.getItem('isUser');
    this.isCustomer = sessionStorage.getItem('isCustomer');
    this.store.dispatch(getProduct({id:this.id}))
  }
  
  // Delete a Product Method
  deleteProduct(): void {
    this.store.dispatch(deleteProduct({id:this.id}))
    alert("Item deleted successfully!")
    this.router.navigate(['/products'])
  }

  // Make an order Method
  checkOut(quantity: string): void {
    const orderedProduct: Order = {
      productId: this.id,
      quantity: parseInt(quantity)
    }
    this.orders.push(orderedProduct)
    const customer: string = this.authService.user?.username!;
    const data: ShoppingCartItem = {
      customer: customer,
      products: orderedProduct
    }
    this.store.dispatch(checkOut({item:data}))
  }
  // Go To Shopping Cart Page
  redirect() {
    this.router.navigate(['/shoppingCartPage'])
  }

  public showEditForm(): void {
    this.show = !this.show
  }

}
