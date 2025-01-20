import { CartItem } from "@prisma/client";

export declare interface ICreateCartItemRequest extends Omit<CartItem, 'id'> { }