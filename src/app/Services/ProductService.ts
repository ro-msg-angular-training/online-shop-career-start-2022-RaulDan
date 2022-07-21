import { Injectable } from "@angular/core";
import { ProductItem } from "src/ProductItem";
import { Observable } from "rxjs";
import { backendURL } from "src/utils";
import { HttpClient } from "@angular/common/http";
import { ShoppingCartItem } from "src/ShoppingCardItem";

@Injectable({providedIn:'root'})
export class ProductService{


    constructor(
        private httpClient:HttpClient
    ){}
    add:Boolean=false;
    show:Boolean=false;
    product:ProductItem | undefined;
    items:ShoppingCartItem[]=[]



    public addProduct(product:ProductItem):Observable<ProductItem>{
        return this.httpClient.post<ProductItem>((backendURL+"products"),product)
    }

    public showForm(id:Number):void{
        this.show=!this.show
        this.httpClient.get(`${backendURL}products/${id}`).subscribe((data:any)=>{this.product=data})
    }

    public editProduct(product:ProductItem):Observable<ProductItem>{
        return this.httpClient.put<ProductItem>((backendURL+'products/'+product.id),product)
    }

    public checkOut(item:ShoppingCartItem):void{
        console.log(item)
        console.log(this.items)
        const temp=this.items.find((obj)=>{
            return obj.products.productId===item.products.productId
        })


        if(temp!==undefined)
        {
            const index=this.items.indexOf(temp)
            this.items[index].products.quantity=+(this.items[index].products.quantity)+ (+item.products.quantity);
        }
        else{
            this.items.push(item);
            
        }
        this.httpClient.post((backendURL+"post"),item,{ responseType: 'text' }).subscribe(()=>{
            alert("Order created!")
          })
    }
    

}