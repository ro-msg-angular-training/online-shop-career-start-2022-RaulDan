import { ProductItem } from "./ProductItem";

export interface ProductFormInterface{
    show:boolean,
    add:boolean,
    product:ProductItem | undefined
}