import { Order } from "@prisma/client";

export declare interface IUpdateOrderRequest extends Omit<Order,'cartId'> {}