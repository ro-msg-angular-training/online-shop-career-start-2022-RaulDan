import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private router: Router) { }

  show=false;

  handleClick(){
    this.show=!this.show;
  }

  redirect(id:Number){
    this.router.navigate(['/productDetails',id])
  }

  products=[
    {
      id:2,
      name:"Laptop",
      price:200
    }
    ,
    {
      id:3,
      name:"PC",
      price:350
    }
    ,
    {
      id:4,
      name:"Gaming Laptop",
      price:400
    }
  ]

  ngOnInit(): void {
  }

}
