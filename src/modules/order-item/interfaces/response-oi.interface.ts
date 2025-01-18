import { OrderItem } from "@prisma/client";

export declare interface IOiResponse {
    message: string,
    orderItem?: OrderItem,
    orderItems?: OrderItem[]
}