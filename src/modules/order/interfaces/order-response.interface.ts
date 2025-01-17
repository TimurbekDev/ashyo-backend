import { Order } from "@prisma/client";

export declare interface IOrderResponse {
    message: string;
    order?: Order;
    orders?: Order[]
}