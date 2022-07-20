import { Injectable } from "@angular/core";
import { ProductItem } from "src/ProductItem";
import { ProductFormInterface } from "src/ProductFormInterface";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class ProductService{


    add:Boolean=false;
    show:Boolean=false;
    product:ProductItem | undefined;

    // Add or Edit A Product
    modifyProduct(add:Boolean,product?:ProductItem):void{
        
        this.show=true;
        this.add=add;
        this.product=product;   
    }
    

}