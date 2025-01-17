import { ProductItem } from "@prisma/client";

export declare interface ICreatePrRequest extends Omit<ProductItem, 'id' | 'image'> {
    image: any
    varations : any
}