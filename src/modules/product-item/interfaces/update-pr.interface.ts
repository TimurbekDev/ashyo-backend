import { ProductItem } from "@prisma/client";

export declare interface IUpdatePrRequest extends Omit<ProductItem, 'productId'> { }