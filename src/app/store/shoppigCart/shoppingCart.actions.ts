import { createAction, props } from "@ngrx/store";
import { ShoppingCartItem } from "src/ShoppingCardItem";

export enum ShoppingCartActions{
    CheckOut='[ShoppingCart] CheckOut',
    CheckOutSuccess='[ShoppingCart] CheckOut Success',
    CheckOutError='[ShoppingCart] Checkout Error',
    GetAllOrders='[ShoppingCart] Get All Orders',
    GetAllOrdersSuccess='[ShoppingCart] Get All Orders Success',
    GetAllOrdersError='[ShoppigCart] Get All Orders Error'
}

export const checkOut=createAction(
    ShoppingCartActions.CheckOut,
    props<{item:ShoppingCartItem}>()
)

export const CheckOutSuccess=createAction(
    ShoppingCartActions.CheckOutSuccess,
)

export const CheckOutError=createAction(
    ShoppingCartActions.CheckOutError,
    props<{error:string}>()
)


// Get All Orders

export const getAllOrders=createAction(
    ShoppingCartActions.GetAllOrders
)

export const getAllOrdersSuccess=createAction(
    ShoppingCartActions.GetAllOrdersSuccess,
    props<{items:ShoppingCartItem[]}>()
)

export const getAllOrdersError=createAction(
    ShoppingCartActions.GetAllOrdersError,
    props<{error:string}>()
)