import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductItem } from 'src/ProductItem';
import { ProductService } from '../Services/product.service';
import { first } from 'rxjs';
import { addNewProduct } from '../store/products/products.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/products/app.state';
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

  success:boolean|null=null

  constructor(
    private fb: FormBuilder,
    private store:Store<AppState>,
    private productService:ProductService
    ) { }
  ngOnInit(): void {
    this.success=false;
  }

  onSubmit():void{
    const product:ProductItem={
      id:undefined,
      category:this.addProductForm.value['category']!,
      price: parseInt(this.addProductForm.value['price']!),  
      name:this.addProductForm.value['name']!,
      description:this.addProductForm.value['description']!,
      image:this.addProductForm.value['image']!

    }
    
    this.store.dispatch(addNewProduct({product:product}))
    this.success=true

    
    
  }

  cancel():void{
    this.addProductForm.setValue({name:'',image:'',category:'',price:'',description:''})
  }

}
