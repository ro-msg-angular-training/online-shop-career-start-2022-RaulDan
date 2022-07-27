import { createReducer,on } from "@ngrx/store";
import { ShoppingCartItem } from "src/ShoppingCardItem";
import * as orderReducer from "./shoppingCart.actions"


export interface ShoppigCartState{
    orders:ShoppingCartItem[],
    error:string,
    status: 'pending' | 'loading' | 'error' | 'success'
}   

export const initialState:ShoppigCartState={
    orders:[],
    error:'',   
    status:'pending'
}

export const shoppingCartReducer=createReducer(
    initialState,

   

    on(orderReducer.checkOut,(state,{item})=>({
        ...state,
        orders:[...state.orders,item],
        status:'loading',
        error:''
    })),
    

    on(orderReducer.getAllOrders,(state)=>({
        ...state,
       status:"loading" 
    })),

    on(orderReducer.getAllOrdersSuccess,(state,{items})=>({
        ...state,
        products:items,
        error:'',
        status:'success'

    })),

    on(orderReducer.getAllOrdersError,(state,{error})=>({
        ...state,
        products:[],
        error:error,
        status:'error'
    }))
)