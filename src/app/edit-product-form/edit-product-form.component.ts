import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.css']
})
export class EditProductFormComponent  {

  editProductForm=this.fb.group({
    id:['',Validators.required],
    name:['',Validators.required],
    image:['',Validators.required],
    description:['',Validators.required],
    price:['',Validators.required],
    category:['',Validators.required]
  })

  constructor(
    private fb:FormBuilder,
    private productService:ProductService
  ) { }

 

}
