import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/Product';
import { Store } from '@ngrx/store';
import { AuthService } from '../Services/auth.service';
import { getAllProducts } from '../store/products/products.actions';
import { selectAllProducts, selectProducts } from '../store/products/products.selectors';
import { AppState } from '../store/products/app.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[]
  public allProducts$=this.store.select(selectAllProducts);
  displayedColumns: string[]=['product-name','product-price','product-details']

  isAdmin: string | null = null
  isUser: string | null = null
  isCustomer: string | null = null  

  constructor(private router: Router,
    public authService: AuthService,
    private store:Store<AppState>
  ) { }

  show = false;

  // Toggle to show or not products from data base
  handleClick() {
    this.show = !this.show;
  }

  // Redirect to product details page of a product
  redirect(id: number|undefined) {
    this.router.navigate(['/productDetails', id])
  }

  // Add A Product To Data Base  
  addProduct(): void {
    this.router.navigate(['/addProduct'])
  }

  // Get all products from database
  ngOnInit(): void {

    // this.products$ = this.http.get<Product[]>(backendURL + 'products');

    this.store.dispatch(getAllProducts())
    
    this.isAdmin = sessionStorage.getItem('isAdmin');
    this.isUser = sessionStorage.getItem('isUser');
    this.isCustomer = sessionStorage.getItem('isCustomer');
  }



}
