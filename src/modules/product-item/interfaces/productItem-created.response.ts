import { Product } from "@prisma/client";

export declare interface IProductItemResponse {
    message: "Successfully created",
    productItem?:Product,
    productItems?: Product[]

}