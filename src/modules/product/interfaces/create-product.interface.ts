import { Product } from "@prisma/client";

export declare interface ICreateProductRequest extends Omit<Product, 'id'> { }