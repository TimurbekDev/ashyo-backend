import { OrderItem } from "@prisma/client";

export declare interface ICreateOiRequest extends Omit<OrderItem,'id'> {}