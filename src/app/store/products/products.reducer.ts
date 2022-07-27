import { createReducer, on } from "@ngrx/store";
import { ProductItem } from "src/ProductItem";


import * as productReducer from "./products.actions";

export interface ProductState {
    products: ProductItem[],
    product:ProductItem|null,
    error: string,
    status: 'pending' | 'loading' | 'error' | 'success'
}

export const initialState: ProductState = {
    products: [],
    product:null,
    error: '',
    status: 'pending'
}

export const productsReducer = createReducer(
    initialState,

    on(productReducer.addNewProduct, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
        status: 'loading'
    })),

  

    // DELETING
    on(productReducer.deleteProduct, (state) => ({
        ...state,
        status:'loading',
        error:''
    })),

    on(productReducer.deleteProductSuccess,(state,{id})=>({
        ...state,
        products:state.products.filter((product)=>product.id!==id),
        status:'success',
        error:''
    })),

    on(productReducer.deleteProductError, (state,{error}) => ({
        ...state,
        error:error,
        status: 'error',
      })),

    // EDITING
    on(productReducer.editProduct, (state) => ({
        ...state,
        status:'loading'
    })),

    on(productReducer.editProductSuccess,(state,{product})=>({
        ...state,
        status:'success',
        products:[...state.products,product]
    })),

    on(productReducer.editProductError, (state,{error}) => ({
        ...state,
        error:error,
        status: 'error',
      })),

      // Getting A Single Product
      on(productReducer.getProduct,(state)=>({
        ...state,
        error:'',
        status:'loading'
      })),

      on(productReducer.getProductSuccess,(state,{product})=>({
        ...state,
        product:product,
        error:'',
        status:'success'
      })),
      on(productReducer.getProductError, (state,{error}) => ({
        ...state,
        error:error,
        status: 'error',
      })),





   

    on(productReducer.getAllProducts, (state) => ({
        ...state,
        status: 'loading'
    })),

    on(productReducer.getAllProductsSuccess, (state, { products }) => {
        return {
            ...state,
            products: products,
            error:"",
            status: 'success',
        }

    }),

    on(productReducer.getAllProductsError, (state,{error}) => ({
        ...state,
        products: [],
        error:error,
        status: 'error'
    }))

)

