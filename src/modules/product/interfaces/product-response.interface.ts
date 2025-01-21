import { Product } from "@prisma/client";

export declare interface IProductResponse {
    message: string;
    product?: Product,
    products?: Product[],
    totalCount?: number,
}