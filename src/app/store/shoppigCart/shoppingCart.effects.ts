import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductService } from "src/app/Services/product.service";
import { AppState } from "../products/app.state";
import * as shoppingActions from "./shoppingCart.actions"
import { getAllOrders } from "./shoppingCart.selectors";
import { catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";
import { ShoppingCartItem } from "src/ShoppingCardItem";

@Injectable()
export class ShoppigCartEffects {

    constructor(
        private action$: Actions,
        private productService: ProductService,
        private store: Store<AppState>
    ) { }


    checkOut$ = createEffect(() => {
        return this.action$.pipe(
          ofType(shoppingActions.checkOut),
          mergeMap(({item}) => {
            return this.productService.checkOut(item).pipe(
              map(() => shoppingActions.CheckOutSuccess()),
              catchError((error) => of(shoppingActions.CheckOutError({error})))
            );
          })
        ); 
      });

      checkOutSuccess$=createEffect(()=>
        this.action$.pipe(
            ofType(shoppingActions.CheckOutSuccess),
            tap(()=>alert("Order Created"))
        )
      )

}   