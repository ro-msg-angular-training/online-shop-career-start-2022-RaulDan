import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendURL } from 'src/environments/environment';
import { ProductItem } from 'src/ProductItem';
import { Order } from 'src/Order';
import { ProductService } from '../Services/product.service';
import { ShoppingCartItem } from 'src/ShoppingCardItem';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number = 0;
  product$: Observable<ProductItem> | undefined
  orders: Order[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private productService: ProductService,
    private authService: AuthService
  ) { }



  // Control edit form to appear or disappear
  show: boolean = false
  isAdmin: string | null = null
  isUser: string | null = null
  isCustomer: string | null = null

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!)// Get product id
    this.product$ = this.productService.getProduct(this.id)
    this.isAdmin = sessionStorage.getItem('isAdmin');
    this.isUser = sessionStorage.getItem('isUser');
    this.isCustomer = sessionStorage.getItem('isCustomer');
  }

  // Delete a Product Method
  deleteProduct(): void {
    this.http.delete(`${backendURL}products/${this.id}`)
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
    this.productService.checkOut(data)
  }
  // Go To Shopping Cart Page
  redirect() {
    this.router.navigate(['/shoppingCartPage'])
  }

  public showEditForm(): void {
    this.show = !this.show
  }

}
