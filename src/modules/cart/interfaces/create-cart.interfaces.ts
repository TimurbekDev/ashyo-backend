import { Cart } from "@prisma/client";

export declare interface ICreateCartRequest extends Omit<Cart,'id'>{}