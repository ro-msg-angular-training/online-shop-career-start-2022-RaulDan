import { AppState } from "../products/app.state";
import { createSelector } from "@ngrx/store";
import {ShoppigCartState} from "./shoppingCart.reducer";

export const selectOrders=(state:AppState)=>state.orders;

export const getAllOrders=createSelector(
    selectOrders,
    (state:ShoppigCartState)=>state.orders
)