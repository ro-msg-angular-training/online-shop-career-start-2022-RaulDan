import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductItem } from 'src/ProductItem';
import { ProductService } from '../Services/productService';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(public productService:ProductService) { }

  // Check if the product is edited or added
  add:Boolean=true

  // Check if the form can be shown or not
  show:Boolean=false

  product:ProductItem | undefined;
  
  productForm=new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
    description: new FormControl(''),
  })


  onSubmit():void{
    console.log(this.productForm.value.category)
  }
  ngOnInit(): void {

    this.show=this.productService.show;
    this.add=this.productService.add;
    this.product=this.productService.product
  }


  

}
