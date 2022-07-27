import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { ProductItem } from 'src/ProductItem';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { editProduct } from '../store/products/products.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/products/app.state';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router:Router,
    private store:Store<AppState>
  ) { }

  product$:Observable<ProductItem> | undefined

  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
    description: new FormControl(''),
  })


  onSubmit(product: ProductItem): void {
    const editedProduct: ProductItem = {
      id: product.id,
      category: this.productForm.value['category']! === '' ? (product?.category) : (this.productForm.value['category']!),
      price: this.productForm.value['price']! === '' ? (product.price) : parseInt(this.productForm.value['price']!),
      name: this.productForm.value['name']! === '' ? (product.name) : (this.productForm.value['name']!),
      description: this.productForm.value['description']! === '' ? (product.description) : (this.productForm.value['description']!),
      image: this.productForm.value['image'] === '' ? (product.image) : (this.productForm.value['image']!)
    }

    this.store.dispatch(editProduct({product:editedProduct}))
    alert("Product Edited Successfully")
    this.router.navigate(['/products'])

  }
  ngOnInit(): void {

    this.product$ = this.productService.getProduct()
  }

  public cancel(product: ProductItem): void {
    this.productForm.setValue({ id: product.id!.toString(), name: product.name!, image: product.image, category: product.category!, price: product.price!.toString(), description: product.description })
  }



}
