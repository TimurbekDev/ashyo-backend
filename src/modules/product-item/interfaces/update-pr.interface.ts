import { ProductItem } from "@prisma/client";

export declare interface IUpdatePrRequest extends Partial<Omit<ProductItem, 'productId' | 'image'>> {
    image?: Express.Multer.File | string;
}