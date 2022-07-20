import { ProductItem } from "./ProductItem";

export interface ProductFormInterface{
    show:Boolean,
    add:Boolean,
    product:ProductItem | undefined
}