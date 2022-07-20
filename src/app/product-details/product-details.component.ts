import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendURL } from 'src/utils';
import { ProductItem } from 'src/ProductItem';
import { Order } from 'src/Order';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id:Number=0;
  product$:Observable<ProductItem> | undefined
  orders:Order[]=[]

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));// Get product id
    this.product$=this.http.get<ProductItem>(backendURL+'products/'+this.id)
  }

  // Delete a Product Method
  deleteProduct():void{
    this.http.delete(`${backendURL}products/${this.id}`).subscribe((data)=>console.log(data))
    alert("Item deleted successfully!")
    this.router.navigate(['/'])
  }

  // Make an order Method
  checkOut(quantity:string):void{
    const orderedProduct:Order={
      productId:this.id,
      quantity:Number(quantity)
    }
    this.orders.push(orderedProduct)
    const customer:string="doej";
    const data:any={
      customer:customer,
      products:this.orders
    }
    this.http.post((backendURL+"post"),data,{ responseType: 'text' }).subscribe(()=>{
      alert("Order created!")
    })
  }

}
