import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { backendURL } from 'src/utils';
import { HttpClient } from '@angular/common/http';
import { ProductItem } from 'src/ProductItem';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {


  addProductForm=this.fb.group({
    id:['',Validators.required],
    name:['',Validators.required],
    image:['',Validators.required],
    description:['',Validators.required],
    price:['',Validators.required],
    category:['',Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private httpClient:HttpClient
    ) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    const product:ProductItem={
      id:Number(this.addProductForm.value['id']),
      category:this.addProductForm.value['category']!,
      price:Number(this.addProductForm.value['price']),
      name:this.addProductForm.value['name']!,
      description:this.addProductForm.value['description']!,
      image:this.addProductForm.value['image']!

    }
    this.httpClient.post((backendURL+"products"),product,{ responseType: 'text' }).subscribe(()=>{
      alert("Order created!")
    })
  }

  cancel():void{
    this.addProductForm.setValue({id:'',name:'',image:'',category:'',price:'',description:''})
  }

}
