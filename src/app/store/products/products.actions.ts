import { createAction, props } from "@ngrx/store";
import { Product } from "src/Product";
import { ProductItem } from "src/ProductItem";
import { ShoppingCartItem } from "src/ShoppingCardItem";

export enum ProductActionTypes {
    Add = '[Product] Add New Product',
    AddProductSucces='[Product] Add Product Success',
    AddProductError='[Product] Add Product Error',

    Checkout = '[Product] Checkout',
    CheckoutSuccess='[Product] Checkout Success',
    CheckoutError='[Product] Checkout Error',

    Delete = '[Product] Delete Product',
    DeleteSuccess='[Product] Delete Product Success',
    DeleteProductError='[Product] Delete Product Error',

    Edit = '[Product] Edit Product',
    EditProductSuccess='[Product] Edit Product Success',
    EditProductError='[Product] Edit Product Error',

    Get = '[Product] Get Product',
    GetProductSuccess = '[Product] Get Product Success',
    GetProductError = '[Product] Get Product Error',

    GetAll = '[Product] Get All Products',
    GetAllProductsSuccess='[Product] Get All Products Success',
    GetAllProductsError='[Product] Get All Products Error'

}


////////////////////// //////////////////
//// ADDING A NEW PRODUCT
////////////////////////////////////////
export const addNewProduct = createAction(
    ProductActionTypes.Add,
    props<{ product: ProductItem }>()
)

export const addNewProductSuccess=createAction(
    ProductActionTypes.AddProductSucces,
    props<{product:ProductItem}>()
)

export const addNewProductError=createAction(
    ProductActionTypes.AddProductError,
    props<{error:string}>()
)

////////////////////// //////////////////
//// CHECKOUT
////////////////////////////////////////

export const checkOut = createAction(
    ProductActionTypes.Checkout,
    props<{ item: ShoppingCartItem }>()
)

////////////////////// //////////////////
//// DELETING A PRODUCT
////////////////////////////////////////
export const deleteProduct = createAction(
    ProductActionTypes.Delete,
    props<{ id: number }>()
)

export const deleteProductSuccess=createAction(
    ProductActionTypes.DeleteSuccess,
    props<{ id: number }>()
)

export const deleteProductError=createAction(
    ProductActionTypes.DeleteProductError,
    props<{error:string}>()
)

////////////////////// //////////////////
//// EDITING A PRODUCT
////////////////////////////////////////

export const editProduct = createAction(
    ProductActionTypes.Edit,
    props<{ product: ProductItem }>()
)

export const editProductSuccess=createAction(
    ProductActionTypes.EditProductSuccess,
    props<{product:ProductItem}>()
)

export const editProductError=createAction(
    ProductActionTypes.EditProductError,
    props<{error:string}>()
)

////////////////////// //////////////////
//// GETTING A PRODUCT
////////////////////////////////////////
export const getProduct = createAction(
    ProductActionTypes.Get,
    props<{ id: number }>()
)

export const getProductSuccess= createAction(
    ProductActionTypes.GetProductSuccess,
    props<{ product: ProductItem }>()
)

export const getProductError=createAction(
    ProductActionTypes.GetProductError,
    props<{error:string}>()
)

////////////////////// //////////////////
//// GETTING ALL PRODUCTS
////////////////////////////////////////
export const getAllProducts = createAction(
    ProductActionTypes.GetAll,
)

export const getAllProductsSuccess = createAction(
    ProductActionTypes.GetProductSuccess,
    props < {products: ProductItem[]} > ()
)

export const getAllProductsError=createAction(
    ProductActionTypes.GetProductError,
    props<{ error: string }>()
)


