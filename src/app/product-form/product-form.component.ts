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


  onSubmit(product:ProductItem):void{
    const editedProduct:ProductItem={
      id:Number(product.id) ,
      category:this.productForm.value['category']! ==='' ? (product?.category) : (this.productForm.value['category']!),
      price:this.productForm.value['price']! ==='' ? (product.price) : Number(this.productForm.value['price']),
      name:this.productForm.value['name']! ==='' ? (product.name) : (this.productForm.value['name']!),
      description:this.productForm.value['description']! === '' ? (product.description) : (this.productForm.value['description']!),
      image:this.productForm.value['image']==='' ? (product.image) : (this.productForm.value['image']!)
    }
    

    this.productService.editProduct(editedProduct).subscribe(()=>{
      alert("Product Edited Successfully")
      window.location.reload()
    })
  }
  ngOnInit(): void {

    this.show=this.productService.show;
    this.add=this.productService.add;
    this.product=this.productService.product
  }

  public cancel(product:ProductItem):void{
    this.productForm.setValue({id:product.id!.toString(), name:product.name!,image:product.image, category:product.category!,price:product.price!.toString(),description:product.description})
  }

  

}
