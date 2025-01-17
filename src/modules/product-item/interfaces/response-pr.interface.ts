import { ProductItem } from "@prisma/client";

export declare interface IProductItemResponse {
    message: string,
    productItem?: ProductItem,
    productItems?: ProductItem[],
    total? : number,
    varations? : any
}