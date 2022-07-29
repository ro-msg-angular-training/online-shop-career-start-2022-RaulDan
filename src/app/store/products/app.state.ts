import { ShoppingCartItem } from "src/ShoppingCardItem";
import { ShoppigCartState } from "../shoppigCart/shoppingCart.reducer";
import { ProductState } from "./products.reducer";

export interface AppState{
    products:ProductState,
    orders:ShoppigCartState
}