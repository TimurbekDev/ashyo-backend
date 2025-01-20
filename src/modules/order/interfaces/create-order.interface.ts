import { Order } from "@prisma/client";

export declare interface ICreateOrderRequest extends Omit<Order,'id'|'status'>{}