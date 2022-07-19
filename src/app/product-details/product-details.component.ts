import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendURL } from 'src/utils';
import { ProductItem } from 'src/ProductItem';
import { OrderProduct } from 'src/OrderProduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id:Number=0;
  product:ProductItem | undefined

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.http.get(`${backendURL}products/${this.id}`).subscribe((data:any)=>{this.product=data})
  }

  deleteProduct():void{
    this.http.delete(`${backendURL}products/${this.id}`).subscribe((data)=>console.log(data))
    alert("Item deleted successfully!")
    this.router.navigate(['/'])
  }

  checkOut(quantity:string):void{
    console.log(quantity)
    const orderedProduct:OrderProduct={
      productId:this.id,
      quantity:Number(quantity)
    }
    const customer:string="doej";
  }

}
