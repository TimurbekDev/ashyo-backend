import { Order } from "@prisma/client";

export declare interface IUpdateOrderRequest extends Pick<Order,'status'|'id'> {}