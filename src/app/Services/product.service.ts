import { Injectable } from "@angular/core";
import { ProductItem } from "src/ProductItem";
import { first, Observable } from "rxjs";
import { backendURL } from "src/utils";
import { HttpClient } from "@angular/common/http";
import { ShoppingCartItem } from "src/ShoppingCardItem";

@Injectable({ providedIn: 'root' })
export class ProductService {


    constructor(
        private httpClient: HttpClient
    ) { }
    show: boolean = false;
    product$: Observable<ProductItem> | undefined
    items: ShoppingCartItem[] = []

    public getProduct(id?: number): Observable<ProductItem> {
        if (typeof id === 'undefined') {
            return this.product$!;
        }
        this.product$ = this.httpClient.get<ProductItem>(backendURL + 'products/' + id);
        return this.product$
    }

    public addProduct(product: ProductItem): Observable<ProductItem> {
        return this.httpClient.post<ProductItem>((backendURL + "products"), product)
    }




    public editProduct(product: ProductItem): Observable<ProductItem> {
        return this.httpClient.put<ProductItem>((backendURL + 'products/' + product.id), product)
    }

    public checkOut(item: ShoppingCartItem): void {
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
        this.httpClient.post((backendURL + "post"), item, { responseType: 'text' }).pipe(first()).subscribe(() => {
            alert("Order created!")
        })
    }


}