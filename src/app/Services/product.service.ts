import { Injectable } from "@angular/core";
import { ProductItem } from "src/ProductItem";
import { first, map, Observable } from "rxjs";
import { backendURL } from "src/utils";
import { HttpClient } from "@angular/common/http";
import { ShoppingCartItem } from "src/ShoppingCardItem";
import { Product } from "src/Product";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../store/products/app.state";
import { getSingleProduct } from "../store/products/products.selectors";

@Injectable({ providedIn: 'root' })
export class ProductService {


    constructor(
        private httpClient: HttpClient,
        private router:Router,
        private store:Store<AppState>
    ) { }
    show: boolean = false;
    product$: Observable<ProductItem> | undefined
    // item$=this.store.select(getSingleProduct)
    items: ShoppingCartItem[] = []

    public getProduct(id?: number): Observable<ProductItem> {
        if (typeof id === 'undefined') {
            return this.product$!;
        }
        return this.httpClient.get<ProductItem>(backendURL + 'products/' + id);
        // return this.product$
    }

    public deleteProduct(id:number){
        this.httpClient.delete(`${backendURL}products/${id}`)
        alert("Item deleted successfully!")
        this.router.navigate(['/products'])
    }

    public delete(id:number){  
        return this.httpClient.delete(`${backendURL}products/${id}`)
    }

    public addProduct(product: ProductItem): Observable<ProductItem> {
        return this.httpClient.post<ProductItem>((backendURL + "products"), product)
    }

    public editProduct(product: ProductItem): Observable<ProductItem> {
        return this.httpClient.put<ProductItem>((backendURL + 'products/' + product.id), product)
    }

    public getAllProducts(): Observable<ProductItem[]> {
        return this.httpClient.get<ProductItem[]>(backendURL + 'products');
    }

    public checkOut(item: ShoppingCartItem): Observable<string> {
        const foundCartItem = this.items.find((obj) => {
            return obj.products.productId === item.products.productId
        })


        if (foundCartItem !== undefined) {
            const index = this.items.indexOf(foundCartItem)
            this.items[index].products.quantity += item.products.quantity;
        }
        else {
            this.items.push(item);

        }
         return this.httpClient.post((backendURL+"post"),item,{responseType:'text'})
        
    }


}