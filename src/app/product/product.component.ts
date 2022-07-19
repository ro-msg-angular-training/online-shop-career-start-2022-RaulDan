import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  product={
    id:1,
    name:"Laptop",
    price:150
  }

  ngOnInit(): void {
  }

}
