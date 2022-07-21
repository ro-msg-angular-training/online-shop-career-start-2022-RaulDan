import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductItem } from 'src/ProductItem';
import { ProductService } from '../Services/productService';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {


  addProductForm=this.fb.group({
    name:['',Validators.required],
    image:['',Validators.required],
    description:['',Validators.required],
    price:['',Validators.required],
    category:['',Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private productService:ProductService
    ) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    const product:ProductItem={
      id:undefined,
      category:this.addProductForm.value['category']!,
      price:Number(this.addProductForm.value['price']),
      name:this.addProductForm.value['name']!,
      description:this.addProductForm.value['description']!,
      image:this.addProductForm.value['image']!

    }
    this.productService.addProduct(product).subscribe((response:ProductItem)=>{
      alert("Product Added Successfully")
    })
  }

  cancel():void{
    this.addProductForm.setValue({name:'',image:'',category:'',price:'',description:''})
  }

}
