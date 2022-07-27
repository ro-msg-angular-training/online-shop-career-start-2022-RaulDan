import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addNewProduct, checkOut, deleteProduct, editProduct, getProduct, getAllProducts, getAllProductsSuccess, getAllProductsError, addNewProductSuccess, addNewProductError, editProductSuccess, editProductError, deleteProductSuccess, deleteProductError, getProductSuccess, getProductError } from "./products.actions";

import { ProductService } from "src/app/Services/product.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, withLatestFrom, mergeMap, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { AppState } from "./app.state";
import { selectAllProducts } from "./products.selectors";

@Injectable()
export class ProductEffects {

    constructor(
        private action$: Actions,
        private productService: ProductService,
        private store: Store<AppState>
    ) { }


    // Run this code when a load action is dispatched
    loadProducts$ = createEffect(() =>
        this.action$.pipe(
            ofType(getAllProducts),
            mergeMap(() =>
                // Call the get method, convert it to an observable
                from(this.productService.getAllProducts()).pipe(
                    // Take the returned value and return a new success action containing the items
                    map((products) => getAllProductsSuccess({ products: products })),
                    // Or... if it errors return a new failure action containing the error
                    catchError((error) => of(getAllProductsError({ error })))
                )
            )
        )
    );

    // Run this code every time when addNewProduct is dispached

    addProduct$ = createEffect(() => {
        return this.action$.pipe(
          ofType(addNewProduct),
          mergeMap(({product}) => {
            return this.productService.addProduct(product).pipe(
              map((product) => addNewProductSuccess({product})),
              catchError((error) => of(addNewProductError({error})))
            );
          })
        ); 
      });

    // Run this code every tie when editProdut is dispached
    editProduct$=createEffect(()=>{
        return this.action$.pipe(
            ofType(editProduct),
            mergeMap(({product})=>{
                return this.productService.editProduct(product).pipe(
                    map(()=>editProductSuccess({product})),
                    catchError((error)=>of(editProductError({error})))
                )
            })
        )
    })

    // Run this code every time when deleteProduct is dispached
    deleteProduct$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteProduct),
            mergeMap(({id})=>{
                return this.productService.delete(id).pipe(
                    map(()=>deleteProductSuccess({id})),
                    catchError((error)=>of(deleteProductError({error})))
                )
            })
        )
    )

    // Run this code every tine when getProduct is dispached (every time a single product is get from the backend)
    getProduct$=createEffect(()=>
            this.action$.pipe(
                ofType(getProduct),
                mergeMap(({id})=>{
                    return this.productService.getProduct(id).pipe(
                        map((product)=>getProductSuccess({product})), 
                        catchError((error)=>of(getProductError({error})))
                    )
                })
            )
    )
}
