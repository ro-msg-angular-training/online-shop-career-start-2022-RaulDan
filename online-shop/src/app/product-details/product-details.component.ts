import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id:Number=0;
  constructor(
    private route:ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
  }

}
